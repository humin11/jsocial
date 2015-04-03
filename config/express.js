/**
 * Created by steven on 15/4/3.
 */
var path = require('path');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressBeautify = require('express-beautify')();
var session = require('express-session');

module.exports = function(app, passport) {
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(session({ secret: 'jsocial' , resave:false,saveUninitialized: true,cookie: { secure: true }}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(require('express').static(path.join(process.cwd(), 'public')));
  app.use(expressBeautify);
};