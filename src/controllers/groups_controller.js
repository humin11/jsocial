var MongoApi = require("../utils/mongoapi")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault

var group = new MongoController({
  table: "groups",
  model: {
    Default: {
      _id: ModelDefault.id,
      create: ModelDefault.now
    }
  },
  url: {
    adduser: function (req, res) {
      /*登录*/
      var model = {}
      model = this.outFormat(model)
      console.log(model)
      var users = require("./users_controller");
      var users = users.toSimple(users.db.findById())
      users.DB.findOne2Simple({"_id": 1}, function (doc) {
        model.user = doc;
        res.send(this.table + "login")
      });
    }
  }
})

module.exports = group
