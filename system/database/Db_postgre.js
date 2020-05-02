var postgre = require('pg').Pool;

class DB_postgre {

    constructor(host = '', user = '', password = '', database = '', port = 5432) {

        this.con = new postgre(
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

        return this.con.query(query).then((res) => {
                return res.rows;
                this.con.end();
        }).catch((err) => {
                return err;
                this.con.end();
        });

    }

}

module.exports = DB_postgre;