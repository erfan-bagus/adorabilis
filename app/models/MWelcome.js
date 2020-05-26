const mongoose = require('mongoose');
const CC_Model = require('../core/CC_Model');
class MWelcome extends CC_Model{
    
    constructor(){
        super();
    }

    schema(){
        return new mongoose.Schema({
            name: {
              type: String,
              required: true
            },
            subscribedChannel: {
              type: String,
              required: true
            },
            subscribeDate: {
              type: Date,
              required: true,
              default: Date.now
            }
        })
    }
}
console.log(mongoose.model('test',new MWelcome().schema()));
// module.exports = mongoose.model('Subscriber', MWelcome());