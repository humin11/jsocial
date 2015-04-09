var passport = require('passport');
var MongoApi = require("../modules/mongoapi")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault

module.exports = new MongoController({
  table: "users",
  model: {
    Default: {
      _id: ModelDefault.id,
      create_at: ModelDefault.now,
      avatar: "/imgs/avatars/avatar.png",
      followed: function(){return [this._id];}
    },
    OutFormat: {
      hide: ["password"]
    },
    SimpleFormat: ["_id","name","avatar"]
  },
  url: {
    login: function (req, res, next) {
      passport.authenticate('local', function (err, user, info) {
        if (!user) {
          res.send({err: err, user: null});
          return;
        }
        req.login(user, function (err) {
          res.send({err: err, user: user});
          return;
        });
      })(req, res, next);
    },
    getUser: function (req, res, next) {
      res.send({err: null, user: req.user});
    }
  }
})

