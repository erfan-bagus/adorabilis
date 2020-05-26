const CC_Controller = require('../../core/CC_Controller');
const mwelcome = require('../../models/MWelcome');
class Welcome extends CC_Controller{

    _remap() {
        return Array(
            ['get', '/', 'index']
        );
    }

     constructor(){
       super();
       this.message ="Welcome to Adorabilis!"
    }
    
     async index(req, res, next) {

        res.render('welcome_message', {title: this.message}); 
    }

}

module.exports = new Welcome();