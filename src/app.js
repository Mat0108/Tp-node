var cors = require('cors');
const express = require('express');

const hostname = "0.0.0.0";
const port = 3000;

const server = express();
server.use(cors());
const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/apinode"); // Whithout Docker
// mongoose.connect("mongodb://mongo/tpnode");
mongoose.connect("mongodb://mongo/tpnodedb", {
    useNewUrlParser: true,
    user: "tpnode",
    pass: "tpnodepass"

}).then(() => {
    console.log('Connexion à la base de données avec succès');
}).catch(err => {
    
    console.log('Erreur de connexion à la base de données');
    process.exit();
});

server.use(express.urlencoded());
server.use(express.json());


const postRoute = require("./api/routes/postRoute");
postRoute(server);

const commentRoute = require("./api/routes/commentRoute");
commentRoute(server);

const userRoute = require("./api/routes/userRoute");
userRoute(server);

server.listen(port, hostname);
