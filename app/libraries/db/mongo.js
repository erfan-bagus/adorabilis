const mongoose = require('mongoose');

class Mongodb{
    constructor(host = '', user = '', password = '', database = '', port = '') {
        this.con = mongoose.connect("mongodb://"+(user!==''?user+":"+password+"@":"")+host+":"+port+"/"+database, { useNewUrlParser: true,useUnifiedTopology: true });
        this.check_connection();   
    }

    check_connection(){
        
        const db = mongoose.connection;
        db.on('error', (error) => {
            console.log("Error connecting database ...");
            console.error(error);
        })
        db.once('open', () => console.log('Database is connected ...'))
    }
}

module.exports = Mongodb;