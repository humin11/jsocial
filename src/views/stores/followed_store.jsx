var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var FollowedModel = require('../../models/followed_model');
var assign = require('object-assign');
var _initCalled = false;
var UserStore = require('./users_store.jsx');

var FOLLOWED_CHANGE = 'followed';

var _followed = new FollowedModel();

var FollowedStore = assign(new EventEmitter2({maxListeners: 99999}),{
  modelName : "followed",
  name : "FollowedStore",
  set:function(followed) {
    _followed.set(followed);
  },
  get: function () {
    return _followed;
  },
  userChange:function(){
    _followed.set(UserStore.get().get().followed);
    this.followedChange();
  },
  followedChange:function(){
    this.emit(FOLLOWED_CHANGE);
  },
  addChangeListener: function(callback) {
    this.on(FOLLOWED_CHANGE, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(FOLLOWED_CHANGE, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.FOLLOW_INIT:
      if(_initCalled) {
        return;
      }
      _initCalled = true;
      FollowedStore.set(UserStore.get().get().followed);
      //UserStore.addChangeListener(FollowedStore.userChange);
      break;
    case ActionTypes.FOLLOW_ADD:
      var person = action.person;
      $.ajax({
        url: "/users/follow",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(person),
        success: function(obj){
          if(obj){
            _followed.add(person);
            FollowedStore.userChange();
            AppDispatcher.dispatch({ type: ActionTypes.POSTS_REFRESH });
          }
        }
      });
      break;
    case ActionTypes.FOLLOW_REMOVE:
      var person = action.person;
      $.ajax({
        url: "/users/unfollow",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(person),
        success: function(obj){
          if(obj){
            _followed.remove(person);
            FollowedStore.userChange();
            AppDispatcher.dispatch({ type: ActionTypes.POSTS_REFRESH });
          }
        }
      });
      break;
  }
});

module.exports = FollowedStore;