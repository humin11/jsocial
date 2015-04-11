/**
 * Created by steven on 15/4/3.
 */
var LocalStrategy = require('passport-local').Strategy;
var userController = require('../src/controllers/users_controller');
var MongoApi = require("../src/modules/mongoapi")

var serialize = function(user, done) {
  done(null, user);
};

var deserialize = function(user, done) {
  user = MongoApi.ConvertObjectId(user);
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
      userController.DB.findSimple({email:username,password:password},function(err,user,next){
        next();
        if(user){
          return done(null, user);
        }else{
          return done(null, false, { message: 'Incorrect username or password.' });
        }
      });

    }
  ));
};