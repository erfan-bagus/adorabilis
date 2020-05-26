const CC_Model = require('../core/CC_Model');
class MWelcome extends CC_Model{
    
    constructor(){
        super();
    }

    getdb(){
       return db.query('select * from artikel').then(({rows, fields})=>{return rows}).catch(e=>console.log(e));
    }
}
module.exports = new MWelcome();