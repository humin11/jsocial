require('./globals');

var express = require('express');
var passport = require('passport')
, qqStrategy = require('passport-qq').Strategy
  ,sinaStrategy = require('passport-sina').Strategy;
var usersController = require('./src/controllers/users_controller');

var app = express();

//passport.use(new qqStrategy({
//    clientID: "",
//    clientSecret: "",
//    callbackURL: "http://127.0.0.1:8080/auth/qq/callback"
//  },
//  function(accessToken, refreshToken, profile, done) {
//    usersController.DB.findOrCreate({ qqId: profile.id },function(err,user){
//
//    });
//  }
//));
//
//passport.use(new sinaStrategy({
//    clientID: 'your app key here'
//    , clientSecret: 'your app secret here'
//    , callbackURL: 'your callback url here'
////  , requireState: true // for csrf, default: true
////  , scope: ['statuses_to_me_read'
////          , 'follow_app_official_microblog']
//  },
//  function(accessToken, refreshToken, profile, callback) {
//    // verify
//    process.nextTick(function () {
//      return callback(null, profile);
//    });
//  }));

require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);


var server = app.listen(process.env.PORT, function() {
  try {
    process.send('CONNECTED');
  } catch(e) {}
});

process.on('uncaughtException', function(err) {
  console.log(arguments);
  process.exit(0);
});
