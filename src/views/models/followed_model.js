var Followed_Model=function(){
  this._followed=[];
  this._followedMap={};
};

Followed_Model.prototype = {
  getFollowed:function(){
    return this._followed;
  },
  hasFollowed: function(userid){
    return this._followedMap[userid];
  },
  setFans : function(fans) {
    _followed = fans;
    _followedMap = {};
    _followed.forEach(function(fan){
      _followedMap[fan._id] = fan;
    });
  }
};
module.exports = Followed_Model;