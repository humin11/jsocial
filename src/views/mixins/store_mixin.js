var assign = require('object-assign');
var StoreMixin = {
  getInitialState: function() {
    var models = this.props.models;
    var stores = this.props.stores;
    if (!stores){
      if (this.props.useStores){
        stores = {};
        this.props.useStores.forEach(function(name){
          var store = require("../stores/" + name + ".jsx");
          stores[store.name] = store;
        });
        models = {};
        for(var name in stores){
          var item = stores[name];
          models[item.modelName] = item.get();
        }
      }
    }
    if (!this.props.server){
      SystemInitStore(stores);
    }
    return {models:models,stores:stores};
  }
};
module.exports = StoreMixin;