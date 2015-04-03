/**
 * Created by steven on 15/4/3.
 */
var _user = null;
var _changeListeners  = [];


var AuthStore = {
  signIn: function (username, password, done) {
    $.ajax({
      url: "/auth",
      type: "POST",
      contentType: "application/json",
      data : JSON.stringify({ username: username, password: password }),
      success: function(obj){
        _user = obj.user;
        AuthStore.notifyChange();
        if (done) {
          done(obj.err, _user);
        }
      }
    });
  },
  isLoggedIn: function () {
    return _user !== null;
  },
  getUser: function () {
    return _user;
  },
  notifyChange: function() {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },
  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },
  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  },
};

module.exports = AuthStore;
