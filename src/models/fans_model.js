var FansModel=function(){
  this._fans=[];
  this._fansMap={};
};

FansModel.prototype = {
  getFans:function(){
    return this._fans;
  },
  hasFans: function(userid){
    return this._fansMap[userid];
  },
  setFans : function(fans) {
    this._fans = fans;
    this._fansMap = {};
    this._fans.forEach(function(fan){
      this._fansMap[fan._id] = fan;
    });
  }
};
module.exports = FansModel;