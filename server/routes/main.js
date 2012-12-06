var urls= require("../urls");

module.exports = function(app) {

    if (urls.base.url != "/") {
        app.get("/", function(req, res) {
            res.redirect(urls.base.url);
        });
    }

    app.get(urls.base.url, function(req, res) {
	var title = "Geography maps";
	res.render("home", { locals: {
            title: title,
        } });
    });

    app.get(urls.maps.world.explore.url, function(req, res) {
	var title = "Geography maps";
	res.render("world", { locals: {
            title: title,
            angular_controller: 'WorldCtrl',
            controller_file: 'main'
        } });
    });
}
