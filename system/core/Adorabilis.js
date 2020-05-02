const express = require('express');
const session = require('express-session');
const nunjucks = require('nunjucks');
const minifier = require('./../libraries/Minify_html');
const app = express();
const bodyParser = require("body-parser");
const router = require('./Router');
global.bcrypt = require('bcrypt');

class Adorabilis {

    constructor() {
        this.app = app;
    }

    run() {
        app.use(bodyParser.urlencoded({ // Middleware
            extended: true
        }));
          
        app.use(bodyParser.json());
        var store = new session.MemoryStore;
        app.use(session({secret: 'user_data',store:store,resave: false,saveUninitialized: false,cookie: { secure: false }}));

        if (router.db_conf.driver_database == 'mysql') {
            let db_s = require('./../database/Db_mysql');
            global.db = new db_s(
                router.db_conf.DB_host,
                router.db_conf.DB_user,
                router.db_conf.DB_password,
                router.db_conf.DB_database,
                router.db_conf.DB_port
            );
        } else if (router.db_conf.driver_database == 'postgre') {
            let db_s = require('./../database/Db_postgre');
            global.db = new db_s(
                router.db_conf.DB_host,
                router.db_conf.DB_user,
                router.db_conf.DB_password,
                router.db_conf.DB_database,
                router.db_conf.DB_port
            );
        }
      
        global.views = function (url_file = '') {
            return url_path + 'application/views/' + url_file;
        }

        nunjucks.configure(views(), {
            autoescape: true,
            express: app,
            noCache: true
        });

        // app.use(minifier.render);
        
        app.set('view engine', router.view_enggine);

        router.generate(express, app);

        app.use('/public', express.static('public', {}));
       
        app.use(function (req, res, next) {
            res.send('not found 404');
        });

    }

}

module.exports = new Adorabilis();