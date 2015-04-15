var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var assign = require('object-assign');
var FansModel = require('../models/fans_model.jsx');

var FANS_CHANGE = 'fans';

var _fans = new FansModel();
var _store = null;

var FansStore = assign(new EventEmitter2({maxListeners: 99999}),{
  getFans:function(){
    return _fans;
  },
  emitFansChange: function() {
    this.emit(FANS_CHANGE);
  },
  setFans:function(fans,store){
    _fans.setFans(fans);
    if (store != _store){
      if (_store){
        _store.removeListener(this.setFans);
      }
      if (store){
        store.addChangeListener(this.setFans);
      }
      _store = store;
    }
    this.emitFansChange();
  },
  followedChange:function(item){
    this.emit(FANS_CHANGE,item);
  },
  addChangeListener: function(callback) {
    this.on(FANS_CHANGE, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.type) {
    default:
      break;
  }
});

module.exports = FansStore;