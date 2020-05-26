const filefinder = require('../libraries/Filefinder');
const configDB = require('../../app/config/database');
class Router{
    generate(express,app,pathApps,config){
        const info_router = [];
        info_router['default'] = [];
        info_router['list_route'] = [];

        let link = [];
        link[0] = '\x1b[32m';
        link[1] = ' \x1b[1m\x1b[34m';
        link[2] = '\x1b[0m\x1b[02m ';
        link[3] = '\x1b[0m';

        filefinder.getAllfile(pathApps.controllers,'').map(({path,name,namenotext,ext},i)=>{
            let router = express.Router({});
            let controller = require(path+'/'+name);
            let cn = controller._remap();
            
            if(name.toLowerCase() == config.DEFAULT_CONTROLLER.toLowerCase()){
                for (let [verb, path, methodName] of cn) {
                    
                    verb = verb.toLowerCase();
                    
                    router[verb](path, controller[methodName].bind(controller));
                    info_router['default'][i] =  link[0]+'-'+ verb + link[1] + path + link[2] +
                                ' ==> ' + namenotext + '/' + methodName + link[3];
                }
                app.use('/', router);
            }else{
                let pathController = path.replace(pathApps.controllers,'')+'/';
                for (let [verb, path, methodName] of cn) {
                    
                    verb = verb.toLowerCase();
                    router[verb](path, controller[methodName].bind(controller));
                    info_router['list_route'][i] = link[0]+'-'+ verb + link[1] + pathController+namenotext.toLowerCase() + link[2] +
                                ' ==> ' + namenotext + '/' + methodName + link[3];
                }
                ;
                app.use('/'+pathController+namenotext.toLowerCase(), router);
            }
        });
        
        if(config.ROUTERINFO){;
            console.log('List Router '+(configDB.DB_Driver !== null && configDB.DB_Driver !== '' ?'&& {DB Driver : \x1b[33m'+configDB.DB_Driver.toUpperCase()+'\x1b[0m}':''));

            console.log('-------------------------------------------------');
    
            console.log(
                '-\x1b[32m[router methods] \x1b[1m\x1b[34m[link] \x1b[0m\x1b[02m[method at co' +
                'ntroller]\x1b[0m'
            );
    
            console.log('-------------------------------------------------');
    
            info_router['default'].forEach(function (val, index) {
                console.log(val);
            });
    
            info_router['list_route'].forEach(function (val, index) {
                console.log(val);
            });
    
            console.log('-------------------------------------------------');
        }

    }
}

module.exports = new Router();