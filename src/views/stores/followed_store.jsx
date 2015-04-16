var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var FollowedModel = require('../models/followed_model');
var assign = require('object-assign');
var _initCalled = false;

var FOLLOWED_CHANGE = 'followed';

var _followed = new FollowedModel();

var FollowedStore = assign(new EventEmitter2({maxListeners: 99999}),{
  hasFollowed: function(userid){
    return _followedMap[userid];
  },
  getFollowed: function () {
    return _followed;
  },
  emitFollowedChange: function() {
    this.emit(FOLLOWED_CHANGE);
  },
  userChange:function(){
    _initCalled = true;
    var user = UserStore.getUser();
    _followedMap = {};
    if(user){
      _followed = user.followed;
      if (!_followed instanceof Array){
        _followed = [];
      }
      _followed.forEach(function(follow){
        _followedMap[follow._id] = follow;
      });
    }
    this.emitFollowedChange();
  },
  followedChange:function(item){
    this.emit(FOLLOWED_CHANGE,item);
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
      UserStore.addChangeListener(this.userChange);
      break;
    case ActionTypes.FOLLOW_ADD:
      var follow = action.follow;
      $.ajax({
        url: "/users/follow",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(follow),
        success: function(obj){
          if(obj){
            _followed[_followed.length] = follow;
            _followedMap[action.follow._id] = follow;
            FollowedStore.followedChange(follow,true);
          }
        }
      });
      break;
    case ActionTypes.FOLLOW_REMOVE:
      var follow = action.follow;
      $.ajax({
        url: "/users/unfollow",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(follow),
        success: function(obj){
          if(obj){
            var index = -1;
            for(;index<_followed.length;index++){
              if (_followed[index]._id = follow._id){
                break;
              }
            }
            if (index>=0){
              _followed.splice(index,1);
            }
            delete _followedMap[action.user._id];
            FollowedStore.followedChange(follow,false);
          }
        }
      });
      break;
  }
});

module.exports = FollowedStore;