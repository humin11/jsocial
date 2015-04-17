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
  isLoggedIn:function() {
    return this._user._id != null;
  }
};
module.exports = User_Model;