var assign = require('object-assign')
var express = require('express');
var MongoClient = require.options.originalRequire('mongodb').MongoClient
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    //assert.equal(BSON, err);
    console.log("Connected correctly to server");

    db.close();
});
var MongoApi = {
    MongoController: function (params) {
        MongoApi.apply(this,params)
    },
    ModelDefault: {
        id: function () {
            return 1
        },
        now: function () {
            return "aaa"
        }
    },
    apply: function (obj, other) {
        for (var item in other) {
            if (obj[item]) {
                arguments.callee(obj[item], other[item])
            } else {
                obj[item] = other[item]
            }
        }
    }
}

MongoApi.MongoController.prototype = {
    binding: function (express) {
        for (var item in this.url) {
            console.log("/" + this.table + "/" + item)
            express.get("/" + this.table + "/" + item, this.url[item].bind(this));
        }
    },
    applyDefault: function (model) {
        var result = assign({}, model);
        for (var item in this.model.Default) {
            var defvalue = this.model.Default[item]
            result[item] = typeof defvalue == 'function' ? defvalue() : defvalue
        }
        return result
    },
    outFormat: function (model) {
        var result = {}
        if (this.model.OutFormat.apply) {
            for (var item in this.model.OutFormat.apply) {
                result[item] = this.model.OutFormat.apply[item]()
            }
        }
        if (this.model.OutFormat.hide) {
            for (var item in model) {
                if (this.model.OutFormat.hide.indexOf(item) == -1) {
                    result[item] = model[item]
                }
            }
        }
        return result
    },
    url: {
        create: function (req, res) {
            //var MongoClient = require('mongodb').MongoClient
            //    , assert = require('assert');
            //var url = 'mongodb://localhost:27017/myproject';
            //MongoClient.connect(url, function(err, db) {
            //    assert.equal(null, err);
            //    console.log("Connected correctly to server");
            //    res.send(this.table + "update");
            //    db.close();
            //});
            console.log(this.table + " create")
            var model = this.applyDefault({})
            console.log(model)
            model = this.outFormat(model)
            console.log(model)
            res.send(this.table + "create");
        },
        update: function (req, res) {
            console.log(this.table + " update")
            res.send(this.table + "update");
        },
        remove: function (req, res) {
            console.log(this.table + " remove")
            res.send(this.table + "remove");

        }
    }
}
module.exports = MongoApi
