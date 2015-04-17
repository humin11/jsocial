/**
 * Created by macbookpro on 15/4/17.
 */
var MongoApi = require('../../src/modules/mongoapi');
var PostsController = require("../../src/controllers/posts_controller");
var UsersController = require("../../src/controllers/users_controller")
var PostsModel= require("../../src/views/models/posts_model");
var UserModel = require("../../src/views/models/user_model");
var RecommendModel = require("../../src/views/models/recommend_model");
var PageStore = require("./page_store");

module.exports = function(Handler,req,sender) {
  PostsController.DB.find({index:1,count:20,query:{}}, function (err, obj, next1) {
    var posts = new PostsModel();
    var user = new UserModel();
    var recommend = new RecommendModel();

    if (req.user){
      UsersController.DB.findOne({_id: MongoApi.ObjectId(req.user._id)},function(err,object,next2){
        user.set(object);
        next2();
      });
    }

    posts.set(obj);
    next1();

    PageStore(sender,req,Handler,{PostsStore:obj,UsersStore:req.user},{posts:posts,user:user,recommend:recommend});
  });
}