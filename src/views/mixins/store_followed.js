var assign = require('object-assign');
var StoreFollowed = {
  componentWillMount: function() {
    var models = this.props.models;
    var stores = this.props.stores;
    if (!this.props.server){
      if (this.state.useStores){
        stores = {};
        this.state.useStores.forEach(function(name){
          var store = require("../stores/" + name + ".jsx");
          stores[store.name] = store;
        });
        models = {};
        for(var name in stores){
          var item = stores[name];
          models[item.modelName] = item.get();
        }
        SystemInitStore(stores);
      }
    }
    this.state.models = models;
    this.state.stores = stores;
  }
};
module.exports = StoreFollowed;