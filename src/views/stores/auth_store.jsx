/**
 * Created by steven on 15/4/3.
 */
var _user = null;
var _changeListeners  = [];
var _initCalled = false;

var URLS = {
  AUTH: "/auth",
  SIGN_UP: "/signup",
  SIGN_OUT: "/signout"
};

var AuthStore = {
  init: function () {
    if(_initCalled) {
      return;
    }
    _initCalled = true;
    this.fetchUser();
  },
  fetchUser: function () {
    $.ajax({
      url: URLS.AUTH,
      type: "GET",
      contentType: "application/json",
      data : JSON.stringify(action.data),
      success: function(obj){
        _user = obj;
        AuthStore.notifyChange();
      }
    });
  },
  signIn: function (username, password, done) {
    _postAndHandleParseUser(URLS.AUTH, username, password, done);
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

function _postAndHandleParseUser(url, email, password, done) {
  $.ajax({
    url: url,
    type: "POST",
    contentType: "application/json",
    data : JSON.stringify({ email: email, password: password }),
    success: function(obj){
      _user = obj;
      AuthStore.notifyChange();
      if (done) {
        done(err, _user);
      }
    }
  });
}

module.exports = AuthStore;
