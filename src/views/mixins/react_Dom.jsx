var ReactDom = {
  addChangeListener(storeName, fun){
    if (this.props.store) {
      if (this.props.store[storeName]) {
        this.props.store[storeName].addChangeListener(fun);
      }
    }
  },
  removeChangeListener(storeName,fun){
    if (this.props.store) {
      if (this.props.store[storeName]) {
        this.props.store[storeName].removeChangeListener(fun);
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
    var m = this.getModel(model);
    if (m){
      if (m[fun]){
        return m[fun](params);
      }
    }
    return def;
  },
  getDefaultValue(property, def){
    var propertys = property.split('.');
    var result = this.props.models[propertys[0]].get();
    for (var i = 1; i < propertys.length; i++) {
      result = result[propertys[i]];
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
module.exports = ReactDom;