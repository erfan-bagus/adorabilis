const nunjucks = require('nunjucks');
const bodyParser = require("body-parser");
const database = require('./Database');
const router = require('./Router');

class Adorabilis{
    server(express,app,pathApps,config){
      
        app.use(bodyParser.urlencoded({ // Middleware
            extended: true
        }));
        
        app.use(bodyParser.json());

        global.views = function (url_file = '') {
            return pathApps.views + url_file;
        }
        nunjucks.configure(views(), {
            autoescape: true,
            express: app,
            noCache: true
        });

        app.set('view engine', 'html');
        router.generate(express,app,pathApps,config);
     
        app.use('/public', express.static('public', {}));
    
        app.use(function (req, res, next) {
           res.render(views('errors/error_404'));
        });
    }
}

module.exports = new Adorabilis();