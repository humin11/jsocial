var MongoApi = require("../modules/mongoapi");
var MongoController = MongoApi.Controller;
var ModelDefault = MongoApi.ModelDefault;
var ModelCheck = MongoApi.ModelCheck;

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
    }
  }
})


