/**
 * Created by steven on 15/4/3.
 */

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var _user = null;
var _initCalled = false;
var CHANGE_EVENT = 'change';

function mapFollowed(){
  if(_user){
    _user.followedMap = {};
    _user.followed.forEach(function(follow){
      _user.followedMap[follow._id] = follow;
    });
  }
}

var AuthStore = assign(new EventEmitter2({maxListeners: 99999}),{
  isLoggedIn: function () {
    return _user !== null;
  },
  getUser: function () {
    return _user;
  },
  hasFollowed: function(userid){
    return _user.followedMap[userid];
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

    case ActionTypes.USERS_INIT:
      if(_initCalled) {
        return;
      }
      _initCalled = true;
      $.ajax({
        url: "/users/getUser",
        type: "POST",
        contentType: "application/json",
        success: function(obj) {
          if(obj.user){
            _user = obj.user;
            mapFollowed();
            AuthStore.emitChange();
          }
        }
      });
      break;
    case ActionTypes.USERS_SIGNUP:
      $.ajax({
        url: "/users/insert",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify({
          name:action.username,
          username: action.username,
          email:action.email,
          password: action.password
        }),
        success: function(obj){
          if(obj){
            _user = obj;
            mapFollowed();
            AuthStore.emitChange();
          }
        }
      });
      break;
    case ActionTypes.USERS_LOGIN:
      $.ajax({
        url: "/users/login",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify({ username: action.username, password: action.password }),
        success: function(obj){
          if(obj.user){
            _user = obj.user;
            mapFollowed();
          }
          AuthStore.emitChange();
        }
      });
      break;
    case ActionTypes.USERS_FOLLOW:
      $.ajax({
        url: "/users/follow",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.user),
        success: function(obj){
          if(obj){
            _user.followedMap[action.user._id] = action.user;
            AuthStore.emitChange();
          }
        }
      });
      break;
    case ActionTypes.USERS_UNFOLLOW:
      $.ajax({
        url: "/users/unfollow",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.user),
        success: function(obj){
          if(obj){
            delete _user.followedMap[action.user._id];
            AuthStore.emitChange();
          }
        }
      });
      break;
    case ActionTypes.USERS_LOGOUT:
      break;

    default:
    // do nothing
  }

});


module.exports = AuthStore;
