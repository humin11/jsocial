/**
 * Created by steven on 15/4/2.
 */

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var _data = [];
var _initCalled = false;
var CHANGE_EVENT = 'change';

var PostStore = assign({}, EventEmitter2.prototype, {
  maxListeners: 99999,
  getData: function(){
    return _data;
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

    case ActionTypes.POSTS_INIT:
      if(_initCalled) {
        return;
      }
      $.ajax({
        url: "/posts/list",
        type: "POST",
        contentType: "application/json",
        success: function(obj){
          if (obj) {
            _data = obj;
            _initCalled = true;
            PostStore.emitChange();
          }
        }
      });
      break;
    case ActionTypes.POSTS_CREATE:
      $.ajax({
        url: '/posts/create',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          _data.push(obj);
          PostStore.emitChange();
        }
      });
      break;
    case ActionTypes.COMMENTS_CREATE:
      break;

    default:
    // do nothing
  }

});

module.exports = PostStore;