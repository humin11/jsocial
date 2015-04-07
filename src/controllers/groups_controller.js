var MongoApi = require("mongo_controller")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault

var users = new MongoController({
  table: "groups",                              //表名
  model: {                                     //模型格式定义
    Default: {                               //默认格式，用于添加新的对象时，增加附加的属性（调用为函数返回结果）
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
      var user = users.toSimple(users.db.findById())
      users.DB.findOne2Simple({"_id": 1}, function (doc) {
        model.user = doc;
        res.send(this.table + "login")
      });
    }
  }
})

module.exports = users
/**
 * Created by macbookpro on 15/4/4.
 */
