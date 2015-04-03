/**
 * Created by steven on 15/4/2.
 */

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var PostController = require('../../controllers/posts');
var PostStore = new EventEmitter2({maxListeners: 99999});
PostStore.data = PostController.list();

AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.POST_CREATE:
      $.ajax({
        url: '/post/create',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          PostStore.data.push(obj);
          PostStore.emit('change');
        }
      });
      break;

    case ActionTypes.COMMENT_CREATE:
      break;

    default:
    // do nothing
  }

});

module.exports = PostStore;