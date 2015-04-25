var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');

var PostActions = {

  delete: function (data,height) {
    AppDispatcher.dispatch({
      type: ActionTypes.POSTS_DELETE,
      data: data,
      height: height
    });
  }

}



module.exports = PostActions;