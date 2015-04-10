var passport = require('passport');
var MongoApi = require("../modules/mongoapi")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault
var assign = require('object-assign')

module.exports = new MongoController({
  table: "users",
  model: {
    Default: {
      _id: ModelDefault.id,
      create_at: ModelDefault.now,
      avatar: "/imgs/avatars/avatar.png",
      followed: function(req,model){
        return [assign({},model)];
      }
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
          res.send({err:null,user:null});
          return;
        }
        req.login(user, function (err) {
          res.send({err:null,user:user});
          return;
        });
      })(req, res, next);
    },
    getUser: function (req, res, next) {
      if (req.user){
        this.DB.findOne({_id: MongoApi.ObjectId(req.user._id)},function(err,object,next){
          res.send({err:null,user:object});
          next();
        });
      } else {
        res.send({err:null,user:null});
      }
    },
    findRecommend: function(req, res){
      if(req.user) {
        this.DB.findSimples({count: 3, query: {_id: {$ne: MongoApi.ObjectId(req.user._id)}}}, function (err, object, next) {
          console.log(object);
          res.send(object);
          next();
        });
      } else {
        res.send([]);
      }
    },
    follow: function(req, res){
      if(req.user) {
        this.DB.update({_id: MongoApi.ObjectId(req.user._id)},{ $push: {followed: req.body}},function(err,next){
          res.send(true);
          next();
        });
      } else {
        res.send(false);
      }
    },
    unfollow: function(req, res){
      if(req.user) {
        this.DB.update({_id: MongoApi.ObjectId(req.user._id)},{ $pull: {followed: {_id: req.body._id}}},function(err,next){
          res.send(true);
          next();
        });
      } else {
        res.send(false);
      }
    }
  }
})

