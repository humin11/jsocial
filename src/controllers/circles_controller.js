var passport = require('passport');
var MongoApi = require("../utils/mongoapi");
var MongoController = MongoApi.Controller;
var ModelDefault = MongoApi.ModelDefault;
var assign = require('object-assign');

module.exports = new MongoController({
  table: "circle",
  model: {
    Default: {
      _id: ModelDefault.id,
      create_at: ModelDefault.now,
      avatar: "/imgs/avatars/avatar0.png",
      followed: function(req,model){
        return [assign({},model)];
      }
    },
    OutFormat: {
      hide: ["password"]
    },
    SimpleFormat: ["_id","username","avatar"]
  },
  url: {
    addPerson: function(req, res){
      if(req.user) {
        this.DB.update({query:{_id: MongoApi.ObjectId(req.user._id)},model:{ $push: {followed: req.body}}},function(err,next){
          res.send(true);
          next();
        });
      } else {
        res.send(false);
      }
    },
    removePerson: function(req, res){
      if(req.user) {
        this.DB.update({query:{_id: MongoApi.ObjectId(req.user._id)},model:{ $pull: {followed: {_id: req.body._id}}}},function(err,next){
          res.send(true);
          next();
        });
      } else {
        res.send(false);
      }
    }
  }
})

