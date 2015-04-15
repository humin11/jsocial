var Fans_Model=function(){
  this._fans=[];
  this._fansMap={};
};

Fans_Model.prototype = {
  getFans:function(){
    return this._fans;
  },
  hasFans: function(userid){
    return this._fansMap[userid];
  },
  setFans : function(fans) {
    _fans = fans;
    _fansMap = {};
    _fans.forEach(function(fan){
      _fansMap[fan._id] = fan;
    });
  }
};
module.exports = Fans_Model;