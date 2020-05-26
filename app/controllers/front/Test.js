class Test {

    _remap() {
        return Array(['get', '/', 'index']);
    }

    constructor(){

    }
    
    index(req, res, next) {
       res.status(200);
       res.json({statusCode:200,'message':'test'})
    }

}

module.exports = new Test();