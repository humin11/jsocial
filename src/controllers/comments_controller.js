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
      like_count:0,
      author:function(req){
        return req.user;
      }
    }
  },
  url: {
    insert: function(req, res){
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
              res.send({post:obj,comment:model});
              next2();
            });
            next1();
          });
          next();
        });
      } else {
        res.send(MongoApi.Json.Error());
      }
    },
    remove: function(req, res){
      if(req.user) {
        var model = MongoApi.ConvertObjectId(req.body);
        this.DB.remove({query:{_id:model._id}}, function (err, next) {
          this.DB.find({ index: 1,count: 3, sort:{ create_at: -1 }, query:{ source:{ _id: model.source._id } }},function(err1,arr,next1){
            var newarr = [];
            for(var i=0;i<arr.length;i++){
              newarr.push(arr[i]);
            }
            next1();
            var PostController = require('./posts_controller');
            PostController.DB.update({query:{_id: model.source._id},model:{ $inc:{comment_count:-1},$set: {comments: newarr}}},function(err2,next2){
              PostController.DB.findOne({query:{_id: model.source._id}},function(err3,obj,next3){
                res.send(obj);
                next3();
              });
              next2();
            });
          });
          next();
        }.bind(this));
      } else {
        res.send(MongoApi.Json.Error());
      }

    }
  }
})
