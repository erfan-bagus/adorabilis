const server = require('../system/core/Server'); 

class System{
    
    constructor(){
        
    }

    run (envApps,pathApps){
        server.service(pathApps);
        switch(envApps){
            case "developer" :
               
            break;
            case "testing" :
                
            break;
            case "production" :
               
            break;
            default:
                
            break;        
        }        
        
    }
}

module.exports = new System();