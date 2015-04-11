/**
 * Created by steven on 15/4/2.
 */

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var UserStore = require('./users_store.jsx');

var _posts = [];
var _initCalled = false;
var CHANGE_EVENT = 'change';
var POST_CHANGE_EVENT = 'post:change';
var COMMENT_CHANGE_EVENT = 'comment:change';

function updatePost(post){
  for(var i=0; i < _posts.length; i++){
    if(_posts[i]._id == post._id){
      _posts[i] = post;
    }
  }
}

function updateComments(id,comments){
  for(var i=0; i < _posts.length; i++){
    if(_posts[i]._id == id){
      _posts[i].comments = comments;
    }
  }
}

var PostStore = assign({}, EventEmitter2.prototype, {
  maxListeners: 99999,
  getPosts: function(){
    return _posts;
  },
  getComments: function(id){
    for(var i=0; i < _posts.length; i++){
      if(_posts[i]._id == id){
        return _posts[i].comments;
      }
    }
    return [];
  },
  getPost: function(id){
    for(var i=0; i < _posts.length; i++){
      if(_posts[i]._id == id){
        return _posts[i];
      }
    }
    return null;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitPostChange: function() {
    this.emit(POST_CHANGE_EVENT);
  },
  addPostChangeListener: function(callback) {
    this.on(POST_CHANGE_EVENT, callback);
  },
  removePostChangeListener: function(callback) {
    this.removeListener(POST_CHANGE_EVENT, callback);
  },
  emitCommentChange: function() {
    this.emit(COMMENT_CHANGE_EVENT);
  },
  addCommentChangeListener: function(callback) {
    this.on(COMMENT_CHANGE_EVENT, callback);
  },
  removeCommentChangeListener: function(callback) {
    this.removeListener(COMMENT_CHANGE_EVENT, callback);
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
            _posts = obj;
            _initCalled = true;
            PostStore.emitChange();
          }
        }
      });
      break;
    case ActionTypes.POSTS_CREATE:
      $.ajax({
        url: '/posts/insert',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify({content:action.content, like_count:0, reshare_count:0, comment_count:0, comments:[]}),
        success: function(obj){
          _posts.push(obj);
          UserStore.getUser().post_count++;
          PostStore.emitChange();
        }
      });
      break;
    case ActionTypes.COMMENTS_CREATE:
      $.ajax({
        url: '/comments/add',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          updatePost(obj);
          PostStore.emitPostChange();
        }
      });
      break;

    default:
    // do nothing
  }

});

module.exports = PostStore;