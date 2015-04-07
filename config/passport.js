/**
 * Created by steven on 15/4/3.
 */
var LocalStrategy = require('passport-local').Strategy;
var userController = require('../src/controllers/users_controller');

var serialize = function(user, done) {
  done(null, user);
};

var deserialize = function(user, done) {
  done(null, user);
};

module.exports = function(passport) {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use('local', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function (username, password, done) {
      userController.findOne({email:username,password:password},function(err,user,next){
        console.log("*****"+user);
        next();
        if (username !== user.username) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });

    }
  ));
};