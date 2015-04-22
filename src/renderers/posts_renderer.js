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
  var postsmodel = new PostsModel();
  var usermodel = new UserModel();
  var recommendmodel = new RecommendModel();
  if (req.user) {
    console.log(req.user);
    UsersController.DB.findOne({_id: MongoApi.ObjectId(req.user._id)}, function (err, user, next2) {
      usermodel.set(user);
      next2();
      var list = [];
      user.followed.forEach(function(follow){
        list.push(MongoApi.ObjectId(follow._id));
      });
      console.log(list);
      PostsController.DB.find({query:{'author._id':{$in:list}},index: 1, count: 20}, function (err, posts, next1) {
        console.log(posts);
        postsmodel.set(posts);
        next1();
        PageStore(sender, req, Handler, {PostsStore: postsmodel.get(), UsersStore: usermodel.get()}, {
          posts: postsmodel,
          user: usermodel,
          recommend: recommendmodel
        });
      });
    });
  }
  else {
    PostsController.DB.find({index: 1, count: 20, query: {}}, function (err, posts, next1) {
      postsmodel.set(posts);
      next1();
      PageStore(sender, req, Handler, {PostsStore: postsmodel.get(), UsersStore: usermodel.get()}, {
        posts: postsmodel,
        user: usermodel,
        recommend: recommendmodel
      });
    });
  }
}