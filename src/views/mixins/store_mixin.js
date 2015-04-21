var assign = require('object-assign');
var userStores = ["fans_store","followed_store","posts_store","recommend_store","users_store"];
var StoreMixin = {
  getInitialState: function() {
    var models = this.props.models;
    var stores = this.props.stores;
    if (!stores) {
      stores = {};
      userStores.forEach(function (name) {
        var store = require("../stores/" + name + ".jsx");
        stores[store.name] = store;
      });
      if (!models) {
        models = {};
        for (var name in stores) {
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