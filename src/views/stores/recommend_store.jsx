/**
 * Created by steven on 15/4/3.
 */

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var RecommendModel = require('../../models/recommend_model');
var _people = new RecommendModel();
var CHANGE_EVENT = 'change';

var RecommendStore = assign(new EventEmitter2({maxListeners: 99999}), {
  modelName : "recommend",
  name : "RecommendStore",
  get: function(){
    return _people;
  },
  set: function(obj){
    _people.set(obj);
    this.emitChange();
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
            RecommendStore.set(obj);
          }
        }
      });
      break;
    default:
    // do nothing
  }

});


module.exports = RecommendStore;
