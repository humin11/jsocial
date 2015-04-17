var User_Model=function(){
  this._user = {};
};

User_Model.prototype = {
  set: function (user) {
    this._user = user;
    if (!user) {
      this._user = {};
    }
  },
  get: function () {
    return this._user;
  },
  hasFollowed: function(userid){
    for(var i=0;i < this._user.followed.length;i++){
      if(this._user.followed[i]._id == userid){
        return true;
      }
    }
    return false;
  },
  isLoggedIn:function() {
    return this._user._id != null;
  }
};
module.exports = User_Model;