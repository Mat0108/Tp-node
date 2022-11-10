const Post = require('../models/postModel');
const textApiProvider = require("../providers/textApiProvider");

exports.listAllPosts = (req, res) => {
    if(req.body.IsConnected === "true"){
        Post.find({}, (error, posts) => {
            if (error) {
                res.status(500);
                console.log(error);
                res.json({ message: "Erreur serveur." });
            }
            else {
                res.status(200);
                res.json(posts);
            }
        })
    }else{
        res.status(500);
        res.json({ message: "Vous n'etes pas connecté" });
   
    }
}

exports.createAPost = (req, res) => {
    let newPost = new Post(req.body);

    if(req.body.isAdmin === "true"){
       let randomTextPromise = textApiProvider.getRandomText();
    
        randomTextPromise.then((response) => {
            if(!newPost.content){
                newPost.content = response;
            }

            newPost.save((error, post) => {
                if (error) {
                    res.status(401);
                    console.log(error);
                    res.json({ message: "Reqûete invalide." });
                }
                else {
                    res.status(201);
                    res.json(post);
                }
            })

        }) 
    }else{
        res.status(500);
        res.json({ message: "Vous n'avez pas la permission de créer un message"});
   
    }
    

}

exports.getAPost = (req, res) => {
    Post.findById(req.params.post_id, (error, post) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json(post);
        }

    })
}

exports.updateAPost = (req, res) => {
    Post.findByIdAndUpdate(req.params.post_id, req.body, { new: true }, (error, post) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json(post);
        }

    })
}

exports.deleteApost = (req, res) => {
    Post.findByIdAndRemove(req.params.post_id, (error) => {
        if (error) {
            res.status(401);
            console.log(error);
            res.json({ message: "Reqûete invalide." });
        }
        else {
            res.status(200);
            res.json({message: "Article supprimé"});
        }

    })
}