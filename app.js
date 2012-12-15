var express = require('express'),
    settings = require('./settings'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    urls = require('./urls');

require('./auth');

var SessionMongoose = require('session-mongoose')(express),
    app = express();

module.exports = app;

var conn = 'mongodb://localhost/geo';
var db = mongoose.connect(conn);

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'eldorado' }));
  app.use(express.session({
      store: new SessionMongoose({
          url: conn
      }),
      secret: 'piecake'
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/../app'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.set("urls", urls);

require('./routes')(app);
app.listen(3001);

//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
