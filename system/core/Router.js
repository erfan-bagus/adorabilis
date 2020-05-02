const Config = require('./Config');

class Router extends Config {

    generate(express, app) {

        let defaut_controllers = this.default_router;
        let controllers = this.list('controller', false);
        let dir_view = this.link_dir('view');

        const info_router = [];
        var i = 0,j = 0;
        var props = [];

        info_router['default'] = [];
        info_router['list_route'] = [];

        controllers.list.forEach(function (val, index) {
            
                let controller = require(controllers.path + '/' + val);
                let router = express.Router({});
                let link = [];

                link[0] = '\x1b[32m';
                link[1] = ' \x1b[1m\x1b[34m';
                link[2] = '\x1b[0m\x1b[02m ';
                link[3] = '\x1b[0m';

                if (defaut_controllers === val) {

                    let cn = controller._remap();

                    for (let [verb, path, methodName] of cn) {
                        verb = verb.toLowerCase();
                        router[verb](path, controller[methodName]);
                        info_router['default'][i] = ' - ' + link[0] + verb + link[1] + path + link[2] +
                                ' ==> ' + val + '/' + methodName + link[3];
                        i++;
                    }

                    app.use('/', router);

                } else {
                    let cn = controller._remap();

                    let nr = val
                        .toLowerCase()
                        .replace('.js', '');

                    for (let [verb, path, methodName] of cn) {
                        verb = verb.toLowerCase();
                        router[verb](path, controller[methodName]);
                        info_router['list_route'][j] = ' - ' + link[0] + verb + link[1] + nr + path +
                                link[2] + ' ==> ' + val + '/' + methodName + link[3];
                        j++;
                    }

                    app.use('/' + nr, router);
                }

            });

        console.log('List Router :');

        console.log('-------------------------------------------------');

        console.log(
            ' - \x1b[32m[router methods] \x1b[1m\x1b[34m[link] \x1b[0m\x1b[02m[method at co' +
            'ntroller]\x1b[0m'
        );

        console.log('-------------------------------------------------');

        info_router['default'].forEach(function (val, index) {
            console.log(val);
        });

        info_router['list_route'].forEach(function (val, index) {
            console.log(val);
        });

        console.log('-------------------------------------------------');

        global.views = function (url_file) {
            return dir_view + '/' + url_file;
        }

    }

}

module.exports = new Router();
