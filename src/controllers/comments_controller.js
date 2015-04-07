/**
 * Created by steven on 15/4/6.
 */
var MongoApi = require("../modules/mongoapi")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault

module.exports = new MongoController({
  table:"comments",
  model:{
    Default:{
      _id:ModelDefault.id,
      create_at:ModelDefault.now,
      author:function(req){
        return req.user;
      }
    }
  }
})
