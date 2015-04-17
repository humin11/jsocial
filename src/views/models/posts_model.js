var Posts_Model=function(){
  this.posts = [];
};

Posts_Model.prototype = {
  set: function (posts) {
    this.posts = posts ? posts : [];
  },
  get: function () {
    return this.posts;
  },
  clearMoreComments: function (id) {
    for(var i=0; i < this.posts.length; i++){
      if(this.posts[i]._id == id){
        delete this.posts[i].morecomments;
        return;
      }
    }
  },
  push: function(post){
    this.posts.push(post);
  },
  updatePost: function (post, comment) {
    for (var i = 0; i < this.posts.length; i++) {
      if (this.posts[i]._id == post._id) {
        if (post.morecomments){
          this.posts[i].morecomments = post.morecomments;
          if (comment)
            this.posts[i].morecomments.push(comment);
        }
        return;
      }
    }
  },
  removePost: function (id) {
    for (var i = 0; i < this.posts.length; i++) {
      if (this.posts[i]._id == id) {
        this.posts.splice(i, 1);
        return;
      }
    }
  },
  removeComment: function (post, comment) {
    for (var i = 0; i < this.posts.length; i++) {
      if (this.posts[i]._id == post._id) {
        if (this.posts[i].morecomments) {
          post.morecomments = this.posts[i].morecomments;
          for (var j = 0; j < post.morecomments.length; j++) {
            if (comment._id == post.morecomments[j]._id) {
              post.morecomments.splice(j, 1);
              break;
            }
          }
        }
        this.posts[i] = post;
        return;
      }
    }
  },
  updatePostComments: function (id, comments) {
    for (var i = 0; i < this.posts[i].length; i++) {
      if (this.posts[i]._id == id) {
        if (this.posts[i].morecomments)
          this.posts[i].morecomments.push(comments);
        else
          this.posts[i].morecomments = comments;
        return;
      }
    }
  }
};
module.exports = Posts_Model;