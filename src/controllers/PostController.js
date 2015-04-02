/**
 * Created by steven on 15/3/31.
 */
var PostController = {
  data:[{author:"admin",content:"adfasdfasdfasdf",create_at:"20150331164200"},
    {author:"admin",content:"123adasdfad",create_at:"20150331164200"}],
  list: function(){
    return this.data;
  },
  findById: function(id){
    return {};
  },
  create: function(obj){
    obj["author"] = "admin";
    obj["create_at"] = "2015-11-21 23:21:00";
    this.data.push(obj);
    console.log(this.data.length);
    return obj;
  },
  routes: function(app){
    app.post('/post/create', function(req, res, next) {
      res.send(this.create(req.body));
    }.bind(this));
    app.post('/post/list', function(req, res, next) {
      res.send(this.list());
    }.bind(this));
    return app;
  }
}

module.exports = PostController;

