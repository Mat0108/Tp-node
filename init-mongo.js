db.createUser ({
    user : "tpnode",
    pwd : "tpnodepass",
    roles : [{
        role : "readWrite", db : "tpnodedb"
    }]
});

db.auth('tpnode', 'tpnodepass');