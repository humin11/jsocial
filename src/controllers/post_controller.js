/**
 * Created by steven on 15/3/31.
 */

var gutil = require('gulp-util');

var PostController = {
  list: function(){
    var data = [{author:"admin",content:"adfasdfasdfasdf",create_at:"20150331164200"},
      {author:"admin",content:"123adasdfad",create_at:"20150331164200"}];
    return data;
  },
  findById: function(id){
    return {};
  },
  create: function(){
    gutil.log('********')
    return "ok";
  }
}

module.exports = PostController;

