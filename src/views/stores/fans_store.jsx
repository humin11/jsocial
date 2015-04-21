var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var FansModel = require('../../models/fans_model');
var UserStore = require('./users_store.jsx');

var FANS_CHANGE = 'fans';

var _fans = new FansModel();
var FansStore = assign(new EventEmitter2({maxListeners: 99999}),{
  get:function(){
    return _fans;
  },
  set:function(fans){
    _fans.set(fans);
    this.emitFansChange();
  },
  fansChange: function() {
    this.emit(FANS_CHANGE);
  },
  addChangeListener: function(callback) {
    this.on(FANS_CHANGE, callback);
  }
});
_fans.set(UserStore.get().get().fans);
UserStore.addChangeListener(function(){
  _fans.set(UserStore.get().get().fans);
});
module.exports = FansStore;