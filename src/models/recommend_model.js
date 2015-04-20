var RecommendModel=function(){
  this._people = [];
};

RecommendModel.prototype = {
  set: function (people) {
    this._people = people ? people : [];
  },
  get: function () {
    return this._people;
  }
}

module.exports = RecommendModel;