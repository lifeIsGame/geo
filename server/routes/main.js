var urls= require("../urls");

module.exports = function(app) {

    if (urls.base.url != "/") {
        app.get("/", function(req, res) {
            res.redirect(urls.base.url);
        });
    }

    // HOME
    app.get(urls.base.url, function(req, res){

      var title = "Welcome to this PLN node";

      res.render('home', { locals: {
          username: req.user,
          title: title,
          node: node,
          menu_active: 'home',
          angular_controller: 'NodeMainController',
          controller_file: 'main'
      } });
    });

}
