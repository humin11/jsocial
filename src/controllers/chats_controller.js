var MongoApi = require("../utils/mongoapi")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault

module.exports = new MongoController({
  table: "chats",
  model: {
    Default: {
      _id: ModelDefault.id,
      create_at: ModelDefault.now,
      from:ModelDefault.author
    }
  },
  url: {
    getChats: function (req, res, next) {
      var model = {
        query : {"$or": [{"form":{id:user._id}}, {"to":{id:user._id}}]}
      };
      this.DB.find(model, function (err, docs, next) {
        var result = this.outFormat(docs);
        res.send(result);
        next();
      }.bind(this));
    }

  }
})