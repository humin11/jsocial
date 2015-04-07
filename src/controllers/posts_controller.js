/**
 * Created by steven on 15/3/31.
 */

var allpost = [
  {"_id":"1",author:"admin",content:"ahaha",create_at:"2015-11-21 23:21:00",
    comments:[{"_id":"11",author:"admin",create_at:"2015-11-21 23:21:00",content:"Nice!"},
              {"_id":"12",author:"steve",create_at:"2015-11-22 23:21:00",content:"Nice!"},
              {"_id":"13",author:"admin",create_at:"2015-11-23 23:21:00",content:"Nice!"}]},
  {"_id":"2",author:"admin",content:"hehehe",create_at:"2015-11-22 23:22:00",
    comments:[{"_id":"21",author:"sally",create_at:"2015-11-21 23:21:00",content:"Nice!"},
              {"_id":"22",author:"billy",create_at:"2015-11-22 23:21:00",content:"Nice!"}]}
];

exports.create = function(req, res, next){
  var obj = req.body;
  obj._id = Math.round(Math.random()*1000);
  obj.author = "admin";
  obj.create_at = "2015-11-21 23:21:00";
  obj.comments = [];
  allpost.push(obj);
  res.send(obj);
};

exports.list = function(req, res, next){
  res.send(allpost);
};



