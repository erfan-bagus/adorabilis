class Welcome {

    _remap() {
        return Array(['get', '/', 'index']);
    }

    index(req, res, next) {
        res.render('welcome_message', {test: 'ss'});
    }

}

module.exports = new Welcome();