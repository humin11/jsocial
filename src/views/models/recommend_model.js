var Recommend_Model=function(){
  this._people = [];
};

Recommend_Model.prototype = {
  set: function (people) {
    this._people = people ? people : [];
  },
  get: function () {
    return this._people;
  }
}

module.exports = Recommend_Model;