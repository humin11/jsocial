var PageStore = function(templatesend,req,Handler,store,models) {
  var script = PageStore.toScript(store);
  var props = {
    server: true,
    req: req,
    models: models
  };
  console.log(1);
  var readerPage = React.renderToStaticMarkup(React.createElement(Handler, props));
  console.log(2);
  templatesend(null, readerPage, script);
}

PageStore.toScript = function(store) {
  var result = "";
  for (var name in store) {
    result += "stores." + name + ".set(" + JSON.stringify(store[name]) + ");";
  }
  return result;
}
module.exports = PageStore;