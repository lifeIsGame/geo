"use strict";

module.exports = function(app, urls) {

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect(urls.login);
    }

    if (urls.base !== "/") {
        app.get("/", function(req, res) {
            res.redirect(urls.base);
        });
    }

    app.get(urls.base, function(req, res) {
	var title = "Geography maps";
	res.render("home", { locals: {
            username: req.user,
            title: title
        } });
    });

    app.get(urls.play, function(req, res) {
	var title = "Geo: Countries quiz";
	res.render("play", { locals: {
            title: title,
            username: req.user,
            mainmenu_active: 'play',
            angular_controller: "PlayController"
        } });
    });

    app.get(urls.discover, function(req, res) {
	var title = "Geo: Lookup for countries";
	res.render("discover", { locals: {
            title: title,
            username: req.user,
            mainmenu_active: 'discover',
            discovermenu_active: 'world',
            angular_controller: "DiscoverController"
        } });
    });
};
