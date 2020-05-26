const express = require('express');
const app = express();
const http = require('http')
const adorabilis = require('./Adorabilis');

class Server {

    service(pathApps){
      const config = require(pathApps.config+'config.js');
      const server = http.createServer(app);
      
      console.log('\x1Bc');
      
      adorabilis.server(express,app,pathApps,config);

      server.on('error', function (e) {
        console.log(e);
        server.close();
      });

      server.listen(config.PORT, function () {
          console.log('\x1b[33mExpress server listening on port : \x1b[32m' + config.PORT + '\x1b[0m');
      });
    }
    
}

module.exports = new Server();