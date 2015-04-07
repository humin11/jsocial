var MongoApi = require("../modules/mongoapi")
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault


module.exports = new MongoController({
  table:"posts",                              //表名
  model:{                                     //模型格式定义
    Default:{                               //默认格式，用于添加新的对象时，增加附加的属性（调用为函数返回结果）
      _id:ModelDefault.id,
      create_at:ModelDefault.now,
      author:function(req){
        return req.user;
      }
    }
  }
})


