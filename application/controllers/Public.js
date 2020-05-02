class Public {

    _remap() {
        return Array(['get', '/', 'index']);
    }

    index(req, res, next) {
        res.render(views('public_file.html'), {
            list_file: find_file('public', '*.', false)['list']
        });
    }

}

module.exports = new Public();