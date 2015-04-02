/**
 * Created by steven on 15/4/2.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/PostConstants');
var PostStore = new EventEmitter2({maxListeners: 99999});

AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.POST_CREATE:
      $.ajax({
        url: '/post/create',
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(data){
          alert(data);
        }
      });
      PostStore.emit('added');
      break;

    case ActionTypes.COMMENT_CREATE:
      break;

    default:
    // do nothing
  }

});

module.exports = PostStore;