var express = require('express')
  , i18n = require('i18next')
  , passport = require('passport')
  , auth = require('./auth')
  , flash = require('connect-flash')
  , settings = require('./settings')
  , urls = require('./urls');

i18n.init();

var app = express();
module.exports = app;

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'eldorado' }));
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/../app'));
  app.use(i18n.handle);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.set("urls", urls);

require('./routes')(app);
app.listen(3000);

i18n.registerAppHelper(app)

//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
