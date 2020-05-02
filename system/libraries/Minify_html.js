const Minifier = require('html-minifier');
class Minify_html {

    render(req, res, next) {
        res.oldRender = res.render;
        res.render = function (view, options) {
            this.oldRender(view, options, function (err, html) {
                if (err) 
                    throw err;
                html = Minifier.minify(html, {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true
                });
                res.send(html);
            });
        };
        next();
    }
}

module.exports = new Minify_html();