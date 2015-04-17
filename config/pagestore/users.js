var MongoApi = require('../../src/modules/mongoapi');
var UsersController = require("../../src/controllers/users_controller");
var UserModel= require("../../src/views/models/user_model");
var PageStore = require("./page_store");

module.exports = function(Handler,req,sender) {
  var user = new UserModel();
  UsersController.DB.findOne({_id: MongoApi.ObjectId(req.user._id)}, function (err, obj, next) {
    user.set(object);
    next();
    PageStore(sender,req,Handler,{UsersStore:obj},{user:user});
  });
}