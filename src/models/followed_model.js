var FollowedModel=function(){
  this._followed=[];
  this._followedMap={};
};

FollowedModel.prototype = {
  get:function(){
    return this._followed;
  },
  set : function(followed) {
    this._followed = followed;
    this._followedMap = {};
    this._followed.forEach(function(item){
      this._followedMap[item._id] = item;
    }.bind(this));
  },
  hasFollowed: function(userid){
    return this._followedMap[userid];
  },
  add:function(followed) {
    if (!this.hasFollowed(followed._id)){
      this._followed.push(followed);
      this._followedMap[followed._id] = followed;
      return true;
    }
    return false;
  },
  remove:function(followed){
    var index = 0;
    for(;index<this._followed.length;index++){
      if (this._followed[index]._id == followed._id){
        break;
      }
    }
    if (index<this._followed.length){
      this._followed.splice(index,1);
    }
    delete this._followedMap[followed._id];
  }
};
module.exports = FollowedModel;