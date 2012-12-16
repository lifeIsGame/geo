"use strict";

var urls= require("../common/urls"),
    passport = require("passport");

module.exports = function(app) {

    app.get(urls.login, function(req, res){
        res.redirect('/auth/google');
    });

    app.get('/auth/google', 
        passport.authenticate('google', { failureRedirect: urls.base }),
            function(req, res) {
            res.redirect(urls.base.url);
    });

    app.get('/auth/google/return', 
        passport.authenticate('google', { failureRedirect: urls.base }),
            function(req, res) {
                res.redirect(urls.base.url);
    });

    app.get(urls.logout, function(req, res){
        req.logout();
        res.redirect(urls.base);
    });

};
