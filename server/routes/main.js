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
	    username: req.user,
            title: title
        } });
    });

    app.get(urls.maps.world.play.url, function(req, res) {
	var title = urls.maps.world.play.title;
	res.render("play", { locals: {
            title: title,
	    username: req.user,
	    mainmenu_active: 'play',
	    angular_controller: "PlayController"
        } });
    });

    app.get(urls.maps.world.discover.url, function(req, res) {
	var title = urls.maps.world.discover.title;
	res.render("discover", { locals: {
            title: title,
	    username: req.user,
	    mainmenu_active: 'discover',
	    discovermenu_active: 'world',
	    angular_controller: "DiscoverController"
        } });
    });

    app.get(urls.maps.asia.discover.url, function(req, res) {
	var title = urls.maps.asia.discover.title;
	res.render("asia", { locals: {
            title: title,
	    username: req.user,
	    angular_controller: "DiscoverController"
        } });
    });

    app.get(urls.maps.america.discover.url, function(req, res) {
	var title = urls.maps.america.discover.title;
	res.render("america", { locals: {
            title: title,
	    username: req.user,
	    angular_controller: "DiscoverController"
        } });
    });

    app.get(urls.maps.europe.discover.url, function(req, res) {
	var title = urls.maps.europe.discover.title;
	res.render("europe", { locals: {
            title: title,
	    username: req.user,
	    angular_controller: "DiscoverController"
        } });
    });

    app.get(urls.maps.africa.discover.url, function(req, res) {
	var title = urls.maps.africa.discover.title;
	res.render("discover", { locals: {
            title: title,
	    username: req.user,
	    mainmenu_active: 'discover',
	    discovermenu_active: 'africa',
	    angular_controller: "DiscoverController"
        } });
    });
};
