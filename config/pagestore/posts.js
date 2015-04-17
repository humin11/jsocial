/**
 * Created by macbookpro on 15/4/17.
 */
var MongoApi = require('../../src/modules/mongoapi');
var PostsController = require("../../src/controllers/posts_controller");
var PostsModel= require("../../src/views/models/posts_model");
var UserModel = require("../../src/views/models/user_model");
var PageStore = require("./page_store");

module.exports = function(Handler,req,sender) {
  PostsController.DB.find({index:1,count:20,query:{}}, function (err, obj, next) {
    var posts = new PostsModel();
    var user = new UserModel();
    user.set(req.user);
    posts.set(obj);
    next();

    PageStore(sender,req,Handler,{PostsStore:obj,UsersStore:req.user},{posts:posts,user:user});
  });
}