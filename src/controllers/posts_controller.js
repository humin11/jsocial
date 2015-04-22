var MongoApi = require("../utils/mongoapi");
var MongoController = MongoApi.Controller;
var ModelDefault = MongoApi.ModelDefault;
var ModelCheck = MongoApi.ModelCheck;
var UsersController = require("./users_controller")

module.exports = new MongoController({
  table:"posts",
  model:{
    Default:{
      _id:ModelDefault.id,
      create_at:ModelDefault.now,
      like_count:0,
      reshare_count:0,
      comment_count:0,
      comments:[],
      author:function(req){
        return req.user;
      }
    },
    Check:{
      author:ModelCheck.notNull
    }
  },
  url: {
    insert: function (req, res) {
      var model = MongoApi.ConvertObjectId(req.body);
      model = this.applyDefault(model, req);
      if (!this.checkModel(model)) {
        res.send(MongoApi.Json.Error("no check", 1));
        return;
      }
      this.DB.insert(model, function (err, next) {
        model = this.outFormat(model);
        res.send(model);
        next();
      }.bind(this));
      require("./users_controller").DB.update({query:{_id:req.user._id},model:{$inc:{post_count:1}}},function(err,next) {
        next();
      }.bind(this));
    },
    find: function (req, res) {
      var model = MongoApi.ConvertObjectId(req.body);
      model.index = (model.index) ? (model.index) : 1;
      model.count = (model.count) ? model.count : 20;
      model.count = (model.count > 0 && model.count < 50) ? model.count : model.count;
      model.query = (model.query) ? (model.query) : {};
      if (req.user) {
        UsersController.DB.findOne({_id: MongoApi.ObjectId(req.user._id)}, function (err, user, next2) {
          next2();
          var list = [];
          user.followed.forEach(function(follow){
            list.push(MongoApi.ObjectId(follow._id));
          });
          this.DB.find({query:{'author._id':{$in:list}},index: 1, count: 20}, function (err, posts, next1) {
            next1();
            res.send(posts);
          }.bind(this));
        }.bind(this));
      }
      else {
        this.DB.find({index: 1, count: 20, query: {}}, function (err, posts, next1) {
          next1();
          res.send(posts);
        }.bind(this));
      }
    }
  }
})


