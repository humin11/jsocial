/**
 * Created by steven on 15/4/3.
 */
var LocalStrategy = require('passport-local').Strategy;

var serialize = function(user, done) {
  done(null, user);
};

var deserialize = function(user, done) {
  done(null, user);
};

module.exports = function(passport) {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use('local', new LocalStrategy(
    function (username, password, done) {
      var user = {
        id: '1',
        username: 'admin',
        password: 'pass'
      };
      if (username !== user.username) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }
  ));
};