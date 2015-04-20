var ReactDom = {
  addChangeListener(storeName, fun){
    if (this.props.store) {
      if (this.props.store[storeName]) {
        this.props.store[storeName].addChangeListener(fun);
      }
    }
  },
  getData(model){
    var result = this.props.models;
    if (result) {
      result = result[model];
      if (result) {
        return result.get();
      }
    }
    return {};
  },
  getDefaultData(property, def){
    var propertys = property.split('.');
    var result = this.props.models[propertys[0]].get();
    for (var i = 1; i < propertys.length; i++) {
      result = result[propertys[i]];
      if (!result)
        return def;
    }
    return result;
  }
}
module.exports = ReactDom;