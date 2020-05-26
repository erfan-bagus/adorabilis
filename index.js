const system = require('./system/System');
const path = require('path'); 
const envapps =  "developer"; //developer | testing | production

global.gpath = path;
global.basepath = path.dirname(require.main.filename) + '/';

const pathapps = {
    basepath : basepath,
    system:basepath+'system/',
    application:basepath+"app/",
    config:basepath+"app/config/",
    controllers:basepath+"app/controllers/",
    models:basepath+"app/models/",
    views:basepath+"app/views/",
}

system.run(envapps,pathapps);