/**
 * Created by macbookpro on 15/4/17.
 */
var MongoApi = require('../utils/mongoapi');
var UsersController = require("../controllers/users_controller")
var CirclesModel= require("../models/circle_model");
var UserModel = require("../models/user_model");
var PageStore = require("./page_renderer");

module.exports = function(Handler,req,sender) {
  UsersController.DB.findOne({_id: MongoApi.ObjectId(req.user._id)}, function (err, obj, next) {
    console.log(1);
    var user = new UserModel();
    var circles = new CirclesModel();
    user.set(obj);
    next();
    PageStore(sender,req,Handler,{UsersStore:obj},{user:user,circles:circles});
  });
}