/**
 * Created by steven on 15/4/2.
 */

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var UserStore = require('./users_store.jsx');
var PostsModel = require('../../models/posts_model');
var _posts = new PostsModel();
var _initCalled = false;
var CHANGE_EVENT = 'change';

var PostsStore = assign(new EventEmitter2({maxListeners: 99999}), {
  get: function(){
    return _posts;
  },
  set: function(obj){
    _posts.set(obj);
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
        url: "/posts/find",
        type: "POST",
        contentType: "application/json",
        success: function(obj){
          if (obj) {
            _posts.set(obj);
            _initCalled = true;
            PostsStore.emitChange();
          }
        }
      });
      break;
    case ActionTypes.POSTS_REFRESH:
      $.ajax({
        url: "/posts/find",
        type: "POST",
        contentType: "application/json",
        success: function(obj){
          _initCalled = true;
          if (obj) {
            _posts.set(obj);
            PostsStore.emitChange();
          }
        }
      });
      break;
    case ActionTypes.POSTS_CREATE:
      $.ajax({
        url: '/posts/insert',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          _posts.push(obj);
          UserStore.get().post_count++;
          PostsStore.emitChange();
        }
      });
      break;
    case ActionTypes.POSTS_DELETE:
      $.ajax({
        url: '/posts/remove',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          _posts.tagRemovePost(action.data._id,action.height);
          UserStore.get().post_count--;
          PostsStore.emitChange();
        }
      });
      break;
    case ActionTypes.COMMENTS_CREATE:
      $.ajax({
        url: '/comments/insert',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          _posts.updatePost(obj.post,obj.comment);
          PostsStore.emitChange();
          ReactBootstrap.Dispatcher.emit('newcomment:collapse',obj.post._id);
          ReactBootstrap.Dispatcher.emit('morecomments:change',obj.post);
        }
      });
      break;
    case ActionTypes.COMMENTS_MORE:
      $.ajax({
        url: '/comments/find',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify({query:action.data}),
        success: function(arr){
          _posts.updatePostComments(action.data.source._id,arr);
          PostsStore.emitChange();
          ReactBootstrap.Dispatcher.emit('morecomments:expand',action.data.source._id);
        }
      });
      break;
    case ActionTypes.COMMENTS_DELETE:
      $.ajax({
        url: '/comments/remove',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          _posts.removeComment(obj,action.data);
          PostsStore.emitChange();
        }
      });
      break;

    default:
    // do nothing
  }

});

module.exports = PostsStore;