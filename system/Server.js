const http = require('http');
const adorabilis = require('./core/Adorabilis');

class Server {

    run() {

        var server = http.createServer(adorabilis.app);

        console.log('\x1Bc');

        adorabilis.run();

        server.on('error', function (e) {
            console.log(e);
            server.close();
        });

        server.listen(port_app, function () {
            console.log('\x1b[33mExpress server listening on port : \x1b[32m' + port_app + '\x1b[0m');
        });

    }

}

module.exports = new Server();