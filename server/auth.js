var passport = require('passport'),
    urls = require('./urls'),
    GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
    returnURL: 'http://geo.qui.guifi.net/auth/google/return',
    realm: 'http://geo.qui.guifi.net/'
}, function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect(urls.login.url);
}

module.exports.ensureAuthenticated = ensureAuthenticated;
