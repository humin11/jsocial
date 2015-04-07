/**
 * Created by steven on 15/4/3.
 */

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var _user = null;
var _initCalled = false;
var CHANGE_EVENT = 'change';

var AuthStore = assign({}, EventEmitter2.prototype, {
  maxListeners: 99999,
  isLoggedIn: function () {
    return _user !== null;
  },
  getUser: function () {
    return _user;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.AUTH_INIT:
      if(_initCalled) {
        return;
      }
      _initCalled = true;
      $.ajax({
        url: "/auth/user",
        type: "POST",
        contentType: "application/json",
        success: function(obj){
          if (obj.user) {
            _user = obj.user;
          }
          AuthStore.emitChange();
        }
      });
      break;
    case ActionTypes.AUTH_LOGIN:
      $.ajax({
        url: "/auth",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify({ username: action.username, password: action.password }),
        success: function(obj){
          _user = obj.user;
          AuthStore.emitChange();
        }
      });
      break;
    case ActionTypes.AUTH_LOGOUT:
      break;

    default:
    // do nothing
  }

});


module.exports = AuthStore;
