const configDB = require('../../app/config/database');
class Database{
    constructor(){
        if(configDB.DB_Driver !=='' && configDB.DB_Driver !==null){
            const dbDriver = require('../../app/libraries/db/'+configDB.DB_Driver.toLowerCase());
            global.db = new dbDriver(configDB.DB_Host,configDB.DB_User,configDB.DB_Password,configDB.DB_Name,configDB.DB_Port);
        }else{
            console.log('Not use Database');
        } 
    }
}
module.exports = new Database();