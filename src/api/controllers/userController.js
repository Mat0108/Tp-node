const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

exports.userRegister = (req, res) => {
    let newUser = new User(req.body);

    const saltRounds = 10;
    newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
    newUser.save((error, user) => {
        if (error) {
            res.status(401);
            res.json({ message: error });
        }
        else {
            res.status(201);
            res.json({ message: `Utilisateur crée : ${user.email}` });
        }
    })


}

exports.loginRegister = (req, res) => {
    // Find user
    User.findOne({ email: req.body.email }, (error, user) => {
        // If user not found
        if (error) {
            res.status(500);
            res.json({ message: "Utilisateur non trouvé" });
        }
        else {
            // User found
            if (user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200);
                
                // Password correct
                let userData = {
                    id: user._id,
                    email: user.email,
                    role: "admin"
                }
                jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "30 days" }, (error, token) => {
                    if(error) {
                        res.status(500);
                        console.log(error);
                        res.json({message: "Impossible de générer le token"});

                    }
                    else {
                        res.status(200);
                        res.json({token:token,user:user});
                    }
                })
            }
            else {
                // Password don't match
                res.status(401);
                console.log(error);
                res.json({ message: "Email ou Mot de passe incorrect" });

            }
        }
    })
}

exports.findAllUser = (req, res) => {
    if(req.body.isAdmin === "true"){
        User.find({}, (error, Users) => {
            if (error) {
                res.status(500);
                console.log(error);
                res.json({ message: "Erreur serveur." });
            }
            else {
                res.status(200);
                res.json(Users);
            }
        })
    }else{
        res.status(500);
        res.json({ message: "Vous n'etes pas admin" });
    
    }
}
