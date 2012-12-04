var urls= require("../urls");

module.exports = function(app) {

    if (urls.base.url != "/") {
        app.get("/", function(req, res) {
            res.redirect(urls.base.url);
        });
    }

}
