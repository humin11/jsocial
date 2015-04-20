/**
 * Created by macbookpro on 15/4/17.
 */
var MongoApi = require('../utils/mongoapi');
var PostsController = require("../controllers/posts_controller");
var UsersController = require("../controllers/users_controller")
var PostsModel= require("../models/posts_model");
var UserModel = require("../models/user_model");
var RecommendModel = require("../models/recommend_model");
var PageStore = require("./page_renderer");

module.exports = function(Handler,req,sender) {
  PostsController.DB.find({index:1,count:20,query:{}}, function (err, obj1, next1) {
    var posts = new PostsModel();
    var user = new UserModel();
    var recommend = new RecommendModel();

    if (req.user){
      UsersController.DB.findOne({_id: MongoApi.ObjectId(req.user._id)},function(err,obj2,next2){
        user.set(obj2);
        next2();

        posts.set(obj1);
        next1();
        PageStore(sender,req,Handler,{PostsStore:posts.get(),UsersStore:user.get()},{posts:posts,user:user,recommend:recommend});
      });
    }
    else{
      posts.set(obj1);
      next1();
      PageStore(sender,req,Handler,{PostsStore:posts.get(),UsersStore:user.get()},{posts:posts,user:user,recommend:recommend});
    }
  });
}