/**
 * Created by steven on 15/4/6.
 */
var MongoApi = require("../modules/mongoapi")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault

module.exports = new MongoController({
  table:"comments",                              //表名
  model:{                                     //模型格式定义
    Default:{                               //默认格式，用于添加新的对象时，增加附加的属性（调用为函数返回结果）
      _id:ModelDefault.id,
      create:ModelDefault.now,
      password:"aaa"
    }
  }
})

//
//
//var comments = [
//  {"_id":"33",author:"user1",create_at:"2015-11-21 23:21:00",content:"Good!"},
//  {"_id":"34",author:"user2",create_at:"2015-11-22 23:21:00",content:"Good!"},
//  {"_id":"35",author:"user3",create_at:"2015-11-23 23:21:00",content:"Good!"},
//  {"_id":"36",author:"user4",create_at:"2015-11-24 23:21:00",content:"Good!"},
//  {"_id":"37",author:"user5",create_at:"2015-11-25 23:21:00",content:"Good!"},
//  {"_id":"38",author:"user6",create_at:"2015-11-26 23:21:00",content:"Good!"},
//  {"_id":"39",author:"user7",create_at:"2015-11-27 23:21:00",content:"Good!"}
//]
//
//exports.create = function(req, res, next){
//  var obj = req.body;
//  obj._id = Math.round(Math.random()*1000);
//  obj.author = "admin";
//  obj.create_at = "2015-11-21 23:21:00";
//  res.send(obj);
//};
//
//exports.list = function(req, res, next){
//  res.send(comments);
//};