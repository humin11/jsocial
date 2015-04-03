/**
 * Created by steven on 15/3/31.
 */

var allpost = [{"_id":"1",author:"admin",content:"ahaha",create_at:"2015-11-21 23:21:00"},
  {"_id":"2",author:"admin",content:"hehehe",create_at:"2015-11-22 23:22:00"}];

exports.create = function(req, res, next){
  var obj = req.body;
  obj["_id"] = "3";
  obj["author"] = "admin";
  obj["create_at"] = "2015-11-21 23:21:00";
  allpost.push(obj);
  res.send(obj);
};

exports.list = function(){
  return allpost;
};



