class Users{
    get_data(){
      //  return db.query('select * from users');
    }

    login_user(username,password){
        //return db.query('select * from users where username = "'+username+'"');
    }
}

module.exports =new Users();