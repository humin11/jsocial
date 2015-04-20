var PageRenderer = function(templatesend,req,Handler,store,models) {
  var script = PageRenderer.toScript(store);
  var props = {
    server: true,
    req: req,
    models: models
  };
  var readerPage = React.renderToStaticMarkup(React.createElement(Handler, props));
  templatesend(null, readerPage, script);
}

PageRenderer.toScript = function(store) {
  var result = "";
  for (var name in store) {
    result += "stores." + name + ".set(" + JSON.stringify(store[name]) + ");";
  }
  return result;
}
module.exports = PageRenderer;