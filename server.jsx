require('./globals');

var express = require('express');
var passport = require('passport');

var app = express();

require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/ajaxrouters')(app);
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
