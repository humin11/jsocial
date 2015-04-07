/**
 * Created by steven on 15/4/3.
 */
var postsController = require('../src/controllers/posts_controller');
var commentsController = require('../src/controllers/comments_controller');
var authController = require("../src/controllers/auth_controller");
var routes = require('../src/routes.jsx');
var html = require('./template');

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
    if(state.routes[0].name === 'not-found') {
      cb({notFound: true}, React.renderToStaticMarkup(React.createElement(Handler)));
      return;
    }
    cb(null, React.renderToStaticMarkup(React.createElement(Handler)));
  });
};

var secured = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
};

module.exports = function(app, passport) {
  /** CATCH-ALL ROUTE **/
  app.get('*', function(req, res, next) {
    if(req.url === '/favicon.ico') return next();
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    var isRTL = req.cookies.rubix_dir === 'rtl' ? true : false;
    renderApp(req, res, function(err, h, token) {
      h = html(isRTL).replace(new RegExp('{container}', 'g'), h || '');
      if (!err) {
        res.sendHTML(h);
      } else if (err.redirect) {
        res.redirect(err.redirect.to);
      } else if (err.notFound) {
        res.sendStatus(404).sendHTML(h);
      }
    });
  });
  app.post("/auth/user", authController.getCurrentUser);
  app.post("/auth", authController.signIn);
  // secured routes
  app.post("/posts/create", postsController.create);
  app.post("/posts/list", postsController.list);
  app.post("/comments/create", commentsController.create);
  app.post("/comments/list", commentsController.list);
};
