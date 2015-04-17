var MongoApi = require('../../src/modules/mongoapi');
var UsersController = require("../../src/controllers/users_controller");
var UserModel= require("../../src/views/models/user_model");
var PageStore = require("./page_store");

module.exports = function(Handler,req,sender) {
  UsersController.DB.findOne({_id: MongoApi.ObjectId(req.user._id)}, function (err, obj, next) {
    var user = new UserModel();
    user.set(obj);
    next();
    PageStore(sender,req,Handler,{UsersStore:obj},{user:user});
  });
}