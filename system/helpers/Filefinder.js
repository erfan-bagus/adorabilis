global.fs = require('fs');
global.path = require('path');
global.url_path = path.dirname(require.main.filename) + '/';

class Filefinder {

    constructor() {
        global.find_file = this.findFiles;
    }

    findFiles(url = '', ext = '.js', monitoring = false) {
        
        let listmonitoring = [];

        listmonitoring['list'] = []
        listmonitoring['path'] = url_path + url;

        fs.readdirSync(url_path + url).forEach(function (file, index) {

                if (file.substr(-3) == ext) {
                    listmonitoring['list'].push(file);
                }
                if (ext == '*.') {
                    listmonitoring['list'].push(file);
                }

         });

        if (monitoring == true) {
            console.log(listmonitoring);
        }

        return listmonitoring;

    }
    
}

module.exports = new Filefinder();