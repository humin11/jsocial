var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var UserModel = require('../../models/user_model');
var _user = new UserModel();
var _initCalled = false;
var CHANGE_EVENT = 'change';

var UserStore = assign(new EventEmitter2({maxListeners: 99999}), {
  modelName : "user",
  name : "UsersStore",
  set: function (user) {
    _user.set(user);
    this.emitChange();
  },
  get:function(){
    return _user;
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.USERS_SIGNUP:
      $.ajax({
        url: "/users/insert",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          UserStore.set(obj.user);
        }
      });
      break;
    case ActionTypes.USERS_LOGIN:
      $.ajax({
        url: "/users/login",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          UserStore.set(obj.user);
        }
      });
      break;
    case ActionTypes.USERS_LOGOUT:
      break;
    default:
    // do nothing
  }

});


module.exports = UserStore;
