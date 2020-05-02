const users = require ('./../models/Users');
class Api {

    _remap() {
        return Array(['get', '/', 'index']);
    }

   async index(req, res, next) {
        
        res.json({status: await users.get_data()});
    }
    
}

module.exports = new Api();