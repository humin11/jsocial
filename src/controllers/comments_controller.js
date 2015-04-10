/**
 * Created by steven on 15/4/6.
 */
var MongoApi = require("../modules/mongoapi")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault

module.exports = new MongoController({
  table:"comments",
  model:{
    Default:{
      _id:ModelDefault.id,
      create_at:ModelDefault.now,
      author:function(req){
        return req.user;
      }
    }
  },
  url: {
    add: function(req, res){
      if(req.user) {
        var model = req.body;
        model._id = ModelDefault.id();
        model.create_at = ModelDefault.now();
        model.author = req.user;
        this.DB.insert(model,function(err,next){
          var PostController = require('./posts_controller');
          PostController.DB.find({_id:model.source_id},function(err,obj,next){
            var comments = obj.comments;
            if(comments.length <= 2){

            }
          });
        });
      } else {
        res.send(null);
      }
    }
  }
})
