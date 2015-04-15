var PageStore = function(templatesend,req,Handler,store,props){
  var script = PageStore.toScript(store);
  props.server = true;
  props.req = req;
  var readerPage = React.renderToStaticMarkup(React.createElement(Handler, props));
  templatesend(null, readerPage, script);
}
PageStore.toScript = function(store) {
  var result = "";
  for (var name in store) {
    result += "store." + name + ".set(" + JSON.stringify(store[name]) + ");";
  }
  return result;
}
module.exports = PageStore;