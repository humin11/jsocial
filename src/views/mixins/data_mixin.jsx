var DataMixin = {
  addChangeListener(storeName, fun){
    if (this.props.stores) {
      if (this.props.stores[storeName]) {
        this.props.stores[storeName].addChangeListener(fun);
      }
    }
  },
  removeChangeListener(storeName,fun){
    if (this.props.stores) {
      if (this.props.stores[storeName]) {
        this.props.stores[storeName].removeChangeListener(fun);
      }
    }
  },
  getModel(model){
    var result = this.props.models;
    if (result) {
      result = result[model];
      if (result) {
        return result.get();
      }
    }
    return {};
  },
  getData(model,fun,def){
    var params = [];
    for (var i = 3; i < arguments.length; i++) {
      params.push(arguments[i]);
    }
    var m = this.props.models;
    if (m){
      m = this.props.models[model];
      if (m[fun]){
        return m[fun](params);
      }
    }
    return def;
  },
  getDefaultValue(property, def){
    var properties = property.split('.');
    var result = this.props.models[properties[0]].get();
    for (var i = 1; i < properties.length; i++) {
      result = result[properties[i]];
      if (!result)
        return def;
    }
    return result;
  },
  reactList(property,listcount,row,col){
    var cols = [];
    for (var i = 0; i < listcount; i++) {
      cols[i] = {};
    }
    var data = this.getDefaultValue(property, []);
    for (var i = 0; i < data.length; i++) {
      var index = i % cols.length;
      var f = cols[index];
      f["rows-" + f.length] = row(data[i]);
    }
    var result = {};
    for (var i = 0; i < cols.length; i++) {
      result['cols-' + i] = col(cols[i]);
    }
    return result;
  }
}
module.exports = DataMixin;