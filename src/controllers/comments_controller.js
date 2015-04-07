/**
 * Created by steven on 15/4/6.
 */

var comments = [
  {"_id":"33",author:"user1",create_at:"2015-11-21 23:21:00",content:"Good!"},
  {"_id":"34",author:"user2",create_at:"2015-11-22 23:21:00",content:"Good!"},
  {"_id":"35",author:"user3",create_at:"2015-11-23 23:21:00",content:"Good!"},
  {"_id":"36",author:"user4",create_at:"2015-11-24 23:21:00",content:"Good!"},
  {"_id":"37",author:"user5",create_at:"2015-11-25 23:21:00",content:"Good!"},
  {"_id":"38",author:"user6",create_at:"2015-11-26 23:21:00",content:"Good!"},
  {"_id":"39",author:"user7",create_at:"2015-11-27 23:21:00",content:"Good!"}
]

exports.create = function(req, res, next){
  var obj = req.body;
  obj._id = Math.round(Math.random()*1000);
  obj.author = "admin";
  obj.create_at = "2015-11-21 23:21:00";
  res.send(obj);
};

exports.list = function(req, res, next){
  res.send(comments);
};