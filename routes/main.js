"use strict";

var urls= require("../urls");

module.exports = function(app) {

    if (urls.base.url !== "/") {
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

    app.get(urls.maps.play.url, function(req, res) {
	var title = urls.maps.play.title;
	res.render("play", { locals: {
            title: title,
            username: req.user,
            mainmenu_active: 'play',
            angular_controller: "PlayController"
        } });
    });

    app.get(urls.maps.discover.url, function(req, res) {
	var title = urls.maps.discover.title;
	res.render("discover", { locals: {
            title: title,
            username: req.user,
            mainmenu_active: 'discover',
            discovermenu_active: 'world',
            angular_controller: "DiscoverController"
        } });
    });
};
