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
        var model = MongoApi.ConvertObjectId(req.body);
        model._id = ModelDefault.id();
        model.create_at = ModelDefault.now();
        model.author = req.user;
        this.DB.insert(model,function(err,next){
          var PostController = require('./posts_controller');
          PostController.DB.findOne({_id:model.source._id},function(err1,obj,next1){
            if(obj.comments.length <= 1){
              obj.comments.push(model);
            }else{
              obj.comments.shift();
              obj.comments.push(model);
            }
            obj.comment_count++;
            PostController.DB.update({query:{_id: obj._id},model:{ $inc:{comment_count:1},$set: {comments: obj.comments}}},function(err2,next2){
              res.send(obj);
              next2();
            });
            next1();
          });
          next();
        });
      } else {
        res.send(null);
      }
    }
  }
})
