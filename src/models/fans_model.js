var FansModel=function(){
  this._fans=[];
  this._fansMap={};
};

FansModel.prototype = {
  get:function(){
    return this._fans;
  },
  set : function(fans) {
    this._fans = fans?fans:[];
    this._fansMap = {};
    this._fans.forEach(function(fan){
      this._fansMap[fan._id] = fan;
    });
  },
  hasFans: function(userid){
    return this._fansMap[userid];
  }
};
module.exports = FansModel;