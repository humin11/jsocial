var FollowedModel=function(){
  this._circles=[];
  this._circlesMap={};
};

FollowedModel.prototype = {
  get:function(){
    return this._circles;
  },
  set : function(followed) {
    this._circles = followed;
    this._circlesMap = {};
    this._circles.forEach(function(item){
      this._circlesMap[item._id] = item;
    }.bind(this));
  },
  hasFollowed: function(userid){
    return this._circlesMap[userid];
  },
  add:function(followed) {
    if (!this.hasFollowed(followed._id)){
      this._circles.push(followed);
      this._circlesMap[followed._id] = followed;
      return true;
    }
    return false;
  },
  remove:function(followed){
    var index = 0;
    for(;index<this._circles.length;index++){
      if (this._circles[index]._id == followed._id){
        break;
      }
    }
    if (index<this._circles.length){
      this._circles.splice(index,1);
    }
    delete this._circlesMap[followed._id];
  }
};
module.exports = FollowedModel;