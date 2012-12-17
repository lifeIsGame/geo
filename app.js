/*jshint es5:true */ 
"use strict";

var express = require('express'),
    settings = require('./settings'),
    mongoose = require('mongoose'),
    urls = require('./common/urls'),
    generate_mongo_url = require('./common/mongo').generate_mongo_url,
    passport = require('passport');

require('./common/auth');

var SessionMongoose = require('session-mongoose')(express),
    app = express();

module.exports = app;

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
    var mongo = settings.mongo;
}

var conn = generate_mongo_url(mongo);

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
  app.locals({ urls: urls });
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

require('./routes')(app);
app.listen(3001);

//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
