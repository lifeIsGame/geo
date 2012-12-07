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
            title: title
        } });
    });

    app.get(urls.maps.world.explore.url, function(req, res) {
	var title = urls.maps.world.explore.title;
	res.render("world", { locals: {
            title: title,
	    angular_controller: "ExploreController"
        } });
    });

    app.get(urls.maps.asia.explore.url, function(req, res) {
	var title = urls.maps.asia.explore.title;
	res.render("asia", { locals: {
            title: title,
	    angular_controller: "ExploreController"
        } });
    });

    app.get(urls.maps.america.explore.url, function(req, res) {
	var title = urls.maps.america.explore.title;
	res.render("america", { locals: {
            title: title,
	    angular_controller: "ExploreController"
        } });
    });

    app.get(urls.maps.europe.explore.url, function(req, res) {
	var title = urls.maps.europe.explore.title;
	res.render("europe", { locals: {
            title: title,
	    angular_controller: "ExploreController"
        } });
    });

    app.get(urls.maps.africa.explore.url, function(req, res) {
	var title = urls.maps.africa.explore.title;
	res.render("africa", { locals: {
            title: title,
	    angular_controller: "ExploreController"
        } });
    });
};
