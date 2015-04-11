/**
 * Created by steven on 15/4/3.
 */

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var _people = [];
var CHANGE_EVENT = 'change';

var RecommendStore = assign(new EventEmitter2({maxListeners: 99999}), {
  getRecommendPeople: function () {
    return _people;
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
    case ActionTypes.RECOMMEND_PEOPLE:
      $.ajax({
        url: "/users/findRecommend",
        type: "POST",
        contentType: "application/json",
        success: function(obj){
          if (obj) {
            _people = obj;
            RecommendStore.emitChange();
          }
        }
      });
      break;
    default:
    // do nothing
  }

});


module.exports = RecommendStore;
