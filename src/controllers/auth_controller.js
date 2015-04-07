var MongoApi = require("../modules/mongoapi")
var passport = require('passport');
var MongoController = MongoApi.Controller
var ModelDefault = MongoApi.ModelDefault

module.exports = new MongoController({
  table:"users",                              //表名
  model:{                                     //模型格式定义
    Default:{                               //默认格式，用于添加新的对象时，增加附加的属性（调用为函数返回结果）
      _id:ModelDefault.id,
      create:ModelDefault.now,
      password:"aaa"
    },
    OutFormat:{
      hide:["password"]
    }
  },
  url:{
    login:function(req, res){
      /*登录*/
      var model = {}
      model = this.outFormat(model)
      console.log(model)
      res.send(this.table + "login")
    }
  }
})

//
//exports.signIn = function(req, res, next) {
//  passport.authenticate('local', function(err, user, info) {
//    if (!user) {
//      res.send({err:err,user:null});
//      return;
//    }
//    req.login(user, function(err) {
//      res.send({err:err,user:user});
//      return;
//    });
//  })(req, res, next);
//};
//
//exports.getCurrentUser = function(req, res, next) {
//  if (req.user) {
//    res.send({err:null, user: req.user});
//  }else{
//    res.send({err:null, user: null});
//  }
//  return;
//};