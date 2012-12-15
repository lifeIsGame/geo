var urls= require("../urls"),
    passport = require("passport");

module.exports = function(app) {

    app.get(urls.login.url, function(req, res){
        res.redirect('/auth/google');
    });

    app.get('/auth/google', 
        passport.authenticate('google', { failureRedirect: urls.base.url }),
            function(req, res) {
            res.redirect(urls.base.url);
    });

    app.get('/auth/google/return', 
        passport.authenticate('google', { failureRedirect: urls.base.url }),
            function(req, res) {
                res.redirect(urls.base.url);
    });

    app.get(urls.logout.url, function(req, res){
        req.logout();
        res.redirect(urls.base.url);
    });

};
