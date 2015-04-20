var assign = require('object-assign')
var express = require('express');
var mongodb = require.options.originalRequire('mongodb')
var MongoClient = mongodb.MongoClient


var MongoApi = {
  Simple: function (fun, controller) {
    this.basefunction = fun;
    this.controller = controller;
  },
  Json: {
    Ok: function (message, object) {
      return {
        code:1,
        state:'OK',
        message:message,
        object:object
      };
    },
    Error: function (message, code) {
      return {
        code:2,
        state:"ERROR",
        errcode:code,
        message:message
      };
    },
    ListOk: function (array, index, count) {
      return {
        code: 1,
        state: "OK",
        array: array,
        index: index,
        count: count
      };
    }
  },
  ConvertObjectId:function(model) {
    for (var name in model) {
      if (name == '_id') {
        model[name] = MongoApi.ObjectId(model[name]);
      }
      else if (model[name] instanceof Array){
        model[name].forEach(function(item){
          MongoApi.ObjectId(item);
        });
      }
      else if (typeof(model[name]) == "object") {
        MongoApi.ConvertObjectId(model[name]);
      }
    }
    return model;
  },
  ModelDefault: {
    id: function () {
      return mongodb.ObjectId();
    },
    now: function () {
      return new Date();
    },
    author:function(req){
      return req.user;
    },
    thisId:function(){
      return this._id;
    }
  },
  ModelCheck:{
    notNull:function(value){
      return value
    }
  },
  ObjectId:mongodb.ObjectId,
  SimpleFormat: ["_id", "name"],
  Controller: function (params) {
    this.table = params.table;
    this.model = params.model;
    this.model = (this.model) ? this.model : {};
    this.model.Default = (this.model.Default) ? this.model.Default : {};
    this.model.Check = (this.model.Check) ? this.model.Check : {};
    this.model.OutFormat = (this.model.OutFormat) ? this.model.OutFormat : {};
    this.model.OutFormat.apply = (this.model.OutFormat.apply) ? this.model.OutFormat.apply : {};

    this.SimpleFormat = (params.model.SimpleFormat) ? params.model.SimpleFormat : MongoApi.SimpleFormat;

    var hide = {};
    if (this.model.OutFormat.hide) {
      for (var i = 0; i < this.model.OutFormat.hide.length; i++) {
        hide[this.model.OutFormat.hide[i]] = true;
      }
    }
    this.model.OutFormat.hide = hide;
    if (params.url) {
      this.url = assign({},MongoApi.Controller.prototype.url,params.url);
    }
    this.DB = new MongoApi.DB(params.table);
    this.DB.SimpleFormat = this.SimpleFormat;
  },
  DB: function (table) {
    this.table = table;
  }
}

MongoApi.Controller.prototype = {
  applyDefault: function (model, req) {
    if (model instanceof Array) {
      var result = [];
      for (var i = 0; i < model.length; i++) {
        result[i] = arguments.callee(model[i], req);
      }
      return result;
    }
    var result = assign({}, model);
    for (var item in this.model.Default) {
      var defvalue = this.model.Default[item];
      result[item] = typeof defvalue == 'function' ? defvalue(req,result) : defvalue;
    }
    return result;
  },
  checkModel:function(model){
    for(var item in this.model.Check){
      if (!this.model.Check[item](model[item]))
        return false;
    }
    return true;
  },
  toSimple: function (model) {
    return this.DB.toSimple(model);
  },
  outFormat: function (model) {
    if (model instanceof Array) {
      var result = [];
      for (var i = 0; i < model.length; i++) {
        result[i] = this.outFormat(model[i]);
      }
      return result;
    }
    var result = {};
    if (this.model.OutFormat.apply) {
      for (var item in this.model.OutFormat.apply) {
        result[item] = this.model.OutFormat.apply[item]();
      }
    }
    if (this.model.OutFormat.hide) {
      for (var item in model) {
        if (!this.model.OutFormat.hide[item]) {
          result[item] = model[item];
        }
      }
    }
    return result;
  },

  url: {
    insert: function (req, res) {
      var model = MongoApi.ConvertObjectId(req.body);
      model = this.applyDefault(model, req);
      if (!this.checkModel(model)) {
        res.send(MongoApi.Json.Error("no check", 1));
        return;
      }
      this.DB.insert(model, function (err, next) {
        model = this.outFormat(model);
        res.send(model);
        next();
      }.bind(this));
    },
    update: function (req, res) {
      var model = MongoApi.ConvertObjectId(req.body);
      data : JSON.stringify(action.data),
        this.DB.update(model, function (err, next) {
          res.send(MongoApi.Json.Ok());
          next();
        }.bind(this));
    },
    remove: function (req, res) {
      var model = MongoApi.ConvertObjectId(req.body);
      this.DB.remove(model, function (err, next) {
        res.send(MongoApi.Json.Ok());
        next();
      }.bind(this));
    },
    findPage: function (req, res) {
      var model = MongoApi.ConvertObjectId(req.body);
      model.index = (model.index) ? (model.index) : 0;
      model.count = (model.count) ? model.count : 20;
      model.count = (model.count > 0 && model.count < 50) ? model.count : model.count;
      this.DB.count(model.query, function (err, count, next1) {
        this.DB.find(model.query, function (err, docs, next2) {
          res.send({
            count: count,
            docs: this.outFormat(docs)
          });
          next2();
        });
        next1();
      });
    },
    find: function (req, res) {
      var model = MongoApi.ConvertObjectId(req.body);
      model.index = (model.index) ? (model.index) : 1;
      model.count = (model.count) ? model.count : 20;
      model.count = (model.count > 0 && model.count < 50) ? model.count : model.count;
      model.query = (model.query) ? (model.query) : {};
      this.DB.find(model, function (err, docs, next) {
        var result = this.outFormat(docs);
        res.send(result);
        next();
      }.bind(this));
    },
    findAndModify:function(req,res){
      var model = MongoApi.ConvertObjectId(req.body);
      model.index = (model.index) ? (model.index) : 1;
      model.count = (model.count) ? model.count : 20;
      model.count = (model.count > 0 && model.count < 50) ? model.count : model.count;
      model.query = (model.query) ? (model.query) : {};
      this.DB.findAndModify(model, function (err, docs, next) {
        var result = this.outFormat(docs);
        res.send(result);
        next();
      }.bind(this));
    },
    findOne: function (req, res) {
      var model = MongoApi.ConvertObjectId(req.body);
      this.DB.findOne(model, function (err, doc, next) {
        res.send(doc);
        next();
      }.bind(this));
    }
  },
  binding: function (express) {
    for (var item in this.url) {
      express.post("/" + this.table + "/" + item, this.url[item].bind(this));
    }
    return this;
  }
}

MongoApi.DB.prototype = {
  connect: function (callback) {
    var url = require(process.cwd() + '/config/database').url;
    var table = this.table;
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection(this.table);
      callback(collection, function () {
        db.close();
      });
    }.bind(this));
  },
  toSimple: function (model) {
    if (!model) {
      return model;
    }
    if (model instanceof Array){
      var result = [];
      model.forEach(function(item){
        var value = {};
        this.SimpleFormat.forEach(function (e) {
          value[e] = item[e];
        }.bind(this));
        result[result.length] = value;
      }.bind(this));
      return result;
    } else{
      var result = {};
      this.SimpleFormat.forEach(function (e) {
        result[e] = model[e];
      }.bind(this));
      return result;
    }
  },
  insert: function (model, callback) {
    this.connect(function (collection, next) {
      var array = model;
      if (model instanceof Array){
        collection.insert(array, {safe: true}, function (err) {
          callback(err, next);
        });}
      else{
        collection.insert([array], {safe: true}, function (err) {
          callback(err, next);
        });
      }
    });
  },
  update: function (updatemodel, callback) {
    var model = updatemodel;
    if (!model.query) {
      model = {
        query: {"_id": model["_id"]},
        model: updatemodel
      }
    }
    this.connect(function (collection,next) {
      collection.update(
        model.query,
        model.model, {w:1}, function(err){
          callback(err,next);
        });
    });
  },
  remove: function (removemodel, callback) {
    var model = removemodel;
    if (!model.query) {
      model = {
        query: {"_id": model["_id"]}
      };
    };
    this.connect(function (collection,next) {
      collection.remove(model.query, function(err){
        callback(err,next);
      }.bind(this));
    }.bind(this));
  },
  count: function (querymodel, callback) {
    this.connect(function (collection,next) {
      collection.count(querymodel, function(err,count){
        callback(err,count,next);
      }.bind(this))
    }.bind(this));
  },
  find: function (querymodel, callback) {
    this.connect(function (collection,next) {
        collection.find(querymodel.query)
          .limit(querymodel.count)
          .skip(querymodel.count * (querymodel.index - 1))
          .sort(querymodel.sort?querymodel.sort:{})
          .toArray(function(err,docs){
            callback(err,docs,next);
          }.bind(this));
      }.bind(this)
    );
  },
  findAndModify:function(querymodel, callback){
    this.connect(function (collection,next) {
        collection.findAndModify(querymodel.query)
          .limit(querymodel.count)
          .skip(querymodel.count * (querymodel.index - 1))
          .sort(querymodel.sort?querymodel.sort:{})
          .toArray(function(err,docs){
            callback(err,docs,next);
          }.bind(this));
      }.bind(this)
    );
  },
  findOne: function (querymodel, callback) {
    this.connect(function (collection,next) {
      collection.findOne(querymodel,function(err,object){
        callback(err,object,next);
      }.bind(this))
    }.bind(this));
  },
  findSimples:function(querymodel,callback) {
    this.connect(function (collection,next) {
        collection.find(querymodel.query)
          .limit(querymodel.count)
          .sort(querymodel.sort?querymodel.sort:{})
          .skip(querymodel.count * (querymodel.index - 1))
          .toArray(function(err,docs){
            callback(err,this.toSimple(docs),next);
          }.bind(this));
      }.bind(this)
    );
  },
  findSimple: function (querymodel, callback) {
    this.connect(function (collection,next) {
      collection.findOne(querymodel,function(err,object){
        callback(err,this.toSimple(object),next);
      }.bind(this));
    }.bind(this));
  }
}
module.exports = MongoApi 
