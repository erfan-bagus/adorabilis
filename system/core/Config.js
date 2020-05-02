const config_file = require('../../application/config/config');
const config_db = require('../../application/config/database');
const filefinder = require('./../helpers/Filefinder');
global.port_app = config_file.PORT;

class Config {

    constructor() {
        this.view_enggine = config_file.VIEW_ENGINE;
        this.default_router = config_file.DEFAULT_CONTROLLER;
        global.token_auth=config_file.API_TOKEN;
        this.db_conf = config_db;
    }

    list(name, bool) {
        if (name == 'controller') {
            return filefinder.findFiles(config_file.CONTROLLER_DIR, '.js', bool);
        } else if (name == 'model') {
            return filefinder.findFiles(config_file.MODELS_DIR, '.js', bool);
        } else if (name == 'view') {
            return filefinder.findFiles(config_file.VIEWS_DIR, '.js', bool);
        }
    }

    link_dir(name) {
        if (name == 'controller') {
            return path.join(
                path.dirname(require.main.filename),
                config_file.CONTROLLER_DIR
            );
        } else if (name == 'model') {
            return path.join(path.dirname(require.main.filename), config_file.MODELS_DIR);
        } else if (name == 'view') {
            return path.join(path.dirname(require.main.filename), config_file.VIEWS_DIR);
        }
    }

}

module.exports = Config;