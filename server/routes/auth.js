var urls= require("../urls")
  , passport = require("passport");

module.exports = function(app) {

    app.get(urls.login.url, function(req, res){
        var title = "Administrator login page";
        res.render('login', { locals: {
            username: req.user,
            message: req.flash('error'),
            title: title,
            menu_active: 'home',
            angular_controller: 'NodeMainController',
            controller_file: 'main'
        } });

    });

    app.post(urls.login.url,
        passport.authenticate('local', { failureRedirect: urls.login.url, failureFlash: true }),
        function(req, res) {
            res.redirect(urls.admin.url);
    });

    app.get(urls.logout.url, function(req, res){
        req.logout();
        res.redirect(urls.base.url);
    });

}
