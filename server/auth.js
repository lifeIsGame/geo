var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , login_url = require('./urls').login.url
  , admins = require('./settings').admins;

function findById(id, fn) {
    var idx = id - 1;
    if (admins[idx]) {
        fn(null, admins[idx]);
    } else {
        fn(new Error('User ' + id + ' does not exist'));
    }
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect(login_url);
}

module.exports.ensureAuthenticated = ensureAuthenticated;

function findByUsername(username, fn) {
    for (var i = 0, len = admins.length; i < len; i++) {
        var user = admins[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
            findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            });
        });
    }
));
