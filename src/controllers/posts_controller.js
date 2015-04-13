var MongoApi = require("../modules/mongoapi")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault


module.exports = new MongoController({
  table:"posts",
  model:{
    Default:{
      _id:ModelDefault.id,
      create_at:ModelDefault.now,
      like_count:0,
      reshare_count:0,
      comment_count:0,
      comments:[],
      author:function(req){
        return req.user;
      }
    }
  },
  url: {
    findShared: function (req, res, next) {

    }
  }
})


