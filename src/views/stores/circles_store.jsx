var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var CircleModel = require('../../models/circle_model');
var assign = require('object-assign');
var _initCalled = false;
var UserStore = require('./users_store.jsx');

var CIRCLES_CHANGE = 'followed';

var _circle = new CircleModel();

var CirclesStore = assign(new EventEmitter2({maxListeners: 99999}),{
  modelName : "circles",
  name : "CirclesStore",
  set:function(circle) {
    _circle.set(circle);
  },
  get: function () {
    return _circle;
  },
  userChange:function(){
    _circle.set(UserStore.get().get().followed);
    this.circleChange();
  },
  circleChange:function(){
    this.emit(CIRCLES_CHANGE);
  },
  addChangeListener: function(callback) {
    this.on(CIRCLES_CHANGE, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CIRCLES_CHANGE, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.CIRCLE_INIT:
      if(_initCalled) {
        return;
      }
      _initCalled = true;
      $.ajax({
        url: "/users/login",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(action.data),
        success: function(obj){
          CirclesStore.set(obj.user);
        }
      });
      break;
    case ActionTypes.FOLLOW_ADD:
      var circle = action.circle;
      $.ajax({
        url: "/users/circle",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(circle),
        success: function(obj){
          if(obj){
            _circle.add(circle);
            CirclesStore.circleChange();
          }
        }
      });
      break;
    case ActionTypes.FOLLOW_REMOVE:
      var circle = action.circle;
      $.ajax({
        url: "/users/uncircle",
        type: "POST",
        contentType: "application/json",
        data : JSON.stringify(circle),
        success: function(obj){
          if(obj){
            _circle.remove(circle);
            CirclesStore.circleChange();
          }
        }
      });
      break;
  }
});

module.exports = CirclesStore;