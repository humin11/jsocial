/**
 * Created by steven on 15/4/3.
 */
var passport = require('passport');

exports.signIn = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      res.send({err:err,user:user});
      return;
    }
    req.login(user, function(err) {
      res.send({err:err,user:user});
      return;
    });
  })(req, res, next);
}