/**
 * Created by steven on 15/4/3.
 */
//var postController = require('../src/controllers/posts_controller');
//var authController = require("../src/controllers/auth_controller");
var routes = require('../src/routes.jsx');
var html = require('./template');
var fs = require('fs');
var formidable = require('formidable');
var util = require('util');
var path = require('path');

var renderApp = function(req, res, cb) {
  var router = ReactRouter.create({
    routes: routes,
    location: req.url,
    onAbort: function(redirect) {
      cb({redirect: redirect});
    },
    onError: function(err) {
      console.log(err);
    }
  });
  router.run(function(Handler, state) {
    if (state.routes[0].name === 'not-found') {
      cb({notFound: true}, React.renderToStaticMarkup(React.createElement(Handler)));
      return;
    }
    if (state.routes.length>1){
      var name = state.routes[1].handler.displayName.toLowerCase() + '_renderer';
      try{
        require("../src/renderers/" + name)(Handler,req,cb);
      }catch(err){
        cb(null, React.renderToStaticMarkup(React.createElement(Handler, {server: true, req: req})));
      }
    }

  });
};

var secured = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
};

module.exports = function(app, passport) {
  fs.readdir("./src/controllers", function(err,files) {
    files.forEach(function(file) {
      require("../src/controllers/" + file).binding(app);
    });
  });
  app.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/tmp/";
    form.keepExtensions = true;
    form.parse(req, function (err, fields, files) {
      var filename = files.file.path.replace(/public/,'');
      res.send(filename);
    });
  });

  app.get('*', function(req, res, next) {
    if(req.url === '/favicon.ico') return next();
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    var isRTL = req.cookies.rubix_dir === 'rtl' ? true : false;
    renderApp(req, res, function(err, h, script) {
      h = html(isRTL).replace(new RegExp('{container}', 'g'), h || '').replace(new RegExp('{storescript}', 'g'), script || '');
      if (!err) {
        res.sendHTML(h);
      } else if (err.redirect) {
        res.redirect(err.redirect.to);
      } else if (err.notFound) {
        res.sendStatus(404).sendHTML(h);
      }
    });
  });
};
