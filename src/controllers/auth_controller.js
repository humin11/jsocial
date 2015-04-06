/**
 * Created by steven on 15/4/3.
 */
var passport = require('passport');

exports.signIn = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      res.send({err:err,user:null});
      return;
    }
    req.login(user, function(err) {
      res.send({err:err,user:user});
      return;
    });
  })(req, res, next);
};

exports.getCurrentUser = function(req, res, next) {
  if (req.user) {
    res.send({err:null, user: req.user});
  }else{
    res.send({err:null, user: null});
  }
  return;
};