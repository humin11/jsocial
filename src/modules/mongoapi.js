var assign = require('object-assign')
var express = require('express');
var apply = require('./apply')
var mongodb = require.options.originalRequire('mongodb')
var MongoClient = mongodb.MongoClient


var MongoApi = {
  Simple: function (fun, controller) {
    this.basefunction = fun;
    this.controller = controller;
  },
  Json: {
    Ok: function (message, object) {
      this.code = 1;
      this.state = "OK";
      this.message = message;
      this.object = object;
    },
    Error: function (message, code) {
      this.code = 2;
      this.state = "ERROR";
      this.errcode = code;
      this.message = message;
    },
    ListOk:function(array,index,count){
      this.code = 1;
      this.state = "OK";
      this.array = array;
      this.index = index;
      this.count = count;
    }
  },
  ModelDefault: {
    id: function () {
      return mongodb.ObjectId();
    },
    now: function () {
      return new Date();
    }
  },
  SimpleFormat: ["_id", "name"],
  Controller: function (params) {
    this.table = params.table;
    this.model = params.model;
    this.model = (this.model) ? this.model : {};
    this.model.Default = (this.model.Default) ? this.model.Default : {};
    this.model.OutFormat = (this.model.OutFormat) ? this.model.OutFormat : {};
    this.model.OutFormat.apply = (this.model.OutFormat.apply) ? this.model.OutFormat.apply : {};
    this.model.OutFormat.hide = (this.model.OutFormat.hide) ? this.model.OutFormat.hide : {};
    if (params.url){
      this.url = assign(params.url,MongoApi.Controller.prototype.url);
    }
    this.DB = new MongoApi.DB(params.table);
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
      result[item] = typeof defvalue == 'function' ? defvalue(req) : defvalue;
    }
    return result;
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
        if (this.model.OutFormat.hide.indexOf(item) == -1) {
          result[item] = model[item];
        }
      }
    }
    return result;
  },
  toSimple: function (model) {
    var reslut = model;
    if (this.model.SimpleFormat) {
      reslut = {};
      forEach(this.model.SimpleFormat, function (e) {
        reslut[e] = model[e];
      })
    }
    return result;
  },
  url: {
    insert: function (req, res) {
      var model = req.body;
      model = this.applyDefault(model, req);
      this.DB.insert(model, function (err, next) {
        model = this.outFormat(model);
        res.send(model);
        next();
      }.bind(this));
    },
    update: function (req, res) {
      var model = req.body;
      data : JSON.stringify(action.data),
        this.DB.update(model, function (err, next) {
          res.send(MongoApi.Json.Ok());
          next();
        }.bind(this));
    },
    remove: function (req, res) {
      var model = req.body
      this.DB.remove(model, function (err, next) {
        res.send(MongoApi.Json.Ok());
        next();
      }.bind(this));
    },
    findPage: function (req, res) {
      var model = req.body;
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
      var model = req.body;
      model.index = (model.index) ? (model.index) : 1;
      model.count = (model.count) ? model.count : 20;
      model.count = (model.count > 0 && model.count < 50) ? model.count : model.count;
      model.query = (model.query) ? (model.query) : {};
      this.DB.find(model, function (err, docs, next) {
        var result = docs;//this.outFormat(docs);
        console.log(result);
        res.send(result);
        next();
      }.bind(this));
    },
    findOne: function (req, res) {
      var model = req.body;
      this.DB.findOne(model, function (err, doc, next) {
        res.send(doc);
        next();
      });
    }
  },
  binding: function (express) {
    for (var item in this.url) {
      console.log("/" + this.table + "/" + item);
      express.post("/" + this.table + "/" + item, this.url[item].bind(this));
      //express.get("/" + this.table + "/" + item, this.url[item].bind(this));
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
        db.close()
      });
    }.bind(this));
  },
  find: function (querymodel, callback) {
    this.connect(function (collection,next) {
        collection.find(querymodel.query)
          .limit(querymodel.count)
          .skip(querymodel.count * (querymodel.index - 1))
          .toArray(function(err,docs){
            console.log(err,docs);
            callback(err,docs,next);
          });
      }
    );
  },
  insert: function (model, callback) {
    this.connect(function (collection, next) {
      var array = model;
      if (model instanceof Array)
        collection.insert(array, {safe: true}, function (err) {
          callback(err, next);
        });
      else
        collection.insert([array], {safe: true}, function (err) {
          callback(err, next);
        });
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
    console.log(model)
    this.connect(function (collection,next) {
      collection.update(
        updatemodel.query,
        {$set: updatemodel.model}, {w:1}, function(err){
          callback(err,next);
        });
    });
  },
  remove: function (updatemodel, callback) {
    var model = removemodel;
    if (!model.query) {
      model = {
        query: {"_id": model["_id"]},
        model: removemodel
      }
    }
    this.connect(function (collection,next) {
      collection.remove(
        updatemodel.query, {safe: true}, function(err){
          callback(err,next);
        });
    });
  },
  count: function (querymodel, callback) {
    this.connect(function (collection,next) {
      collection.count(querymodel, function(err,count){
        callback(err,count,next);
      })
    });
  },
  findOne: function (querymodel, callback) {
    this.connect(function (collection,next) {
      collection.findOne(querymodel),function(err,object){
        callback(err,object,next);
      }
    });
  },
  find2Simple:function(querymodel,callback) {
    this.connect(function (collection, next) {
      collection.find(querymodel.query).limit(querymodel.count).skip(querymodel.count * (index - 1)).toArray(function (err, docs) {
        var list = [];
        forEach(list, function (item) {
          list[list.length] = this.toSimple(item);
        })
        callback(err, list, next);
      });
    });
  },
  findOne2Simple: function (querymodel, callback) {
    this.connect(function (collection,next) {
      collection.findOne(querymodel)(function(doc){
        callback(err,this.toSimple(doc),next);
      });
    });
  },
}
module.exports = MongoApi 

