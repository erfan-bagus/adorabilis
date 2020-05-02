const users = require('./../models/Users');
const jwt = require('jsonwebtoken');

class Panel {
  
    _remap() {
        return Array(['get', '/', 'index'],['get', '/login', 'login_get'],['post', '/login', 'login_post'],['get','/cek_auth','cek_auth']);
    }

    index(req, res, next) {
         
          res.render('panel/pages/dashboard/index.html',[]);
    }
  
    cek_auth(req, res, next){
        let token = req.session.api_token// Express headers are auto converted to lowercase
       
      if (token == null) {
        return res.redirect('/panel/login');
      }
     
     
           if (token.startsWith('Bearer')) {
              // Remove Bearer from string
              token = token.slice(7, token.length);
            }
         
            if (token) {
              jwt.verify(token, token_auth, (err, decoded) => {
                if (err) {
                  return res.json({
                    success: false,
                    message: 'Token is not valid'
                  });
                } else {
                  req.decoded = decoded;
                //   res.json(decoded); 
                
                  return res.status(200).json({
                    success: true,
                    message: 'Auth token is valid'
                  });
                 
                }
              });
            } else {
              return res.json({
                success: false,
                message: 'Auth token is not supplied'
              });
            }
    }

    login_get(req,res,next){
          res.render('panel/pages/login/index.html',[]);
    }
    
    async login_post(req,res){
       
        let username = req.body.username;
        let password = req.body.password;
      
        if (username && password) {
            let data_user =(await users.login_user(username))[0];
            let pass_valid =await bcrypt.compare(password, data_user.password);
           
          if (pass_valid) {
           
            let token = jwt.sign({id_user: data_user.id,},
                token_auth,
              { expiresIn: '7d' // expires in 24 hours
              }

            );
        //     // return the JWT token for the future API calls
            // res.json({
            //   success: true,
            //   message: 'Authentication successful!',
            //   token: token
            // });
            req.session.api_token = token;
            res.redirect('/panel/cek_auth');
          } else {
            res.json({
              success: false,
              message: 'Incorrect username or password'
            });
          }
        } else {
          res.json({
            success: false,
            message: 'Authentication failed! Please check the request'
          });
        }
          
      
    }

}

module.exports = new Panel();
