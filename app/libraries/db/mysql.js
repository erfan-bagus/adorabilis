var mysql = require('mysql');

class Mysql {

    constructor(host = '', user = '', password = '', database = '', port = '') {
       
        this.con = mysql.createConnection(
            {host: host, user: user, password: password, database: database, port: port}
        );

        this.check_connection();
        
    }

    check_connection() {

        this.con.connect(function (err) {
                if (!err) {
                    console.log("Database is connected ...");
                } else {
                    console.log("Error connecting database ...");
                    console.log(err);
                }
        });

    }

    query(query) {
       
        return new Promise(resolve => {
            this.con.connect;
            this.con.query(query, function (err, rows, fields) {
                    if (err !== null) {
                        resolve(err)
                    } else {
                        resolve({rows,fields});
                    }
            });
            this.con.end;
        });

    }

}

module.exports = Mysql;