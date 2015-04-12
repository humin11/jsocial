var classSet = React.addons.classSet;
var moment = require('moment');
moment.locale('zh-cn');
var MoreComments = require('./more_comments.jsx');

var SingleComment = React.createClass({
  render: function () {
    var create_at = moment(this.props.comment.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
    return (
      <div className='inbox-avatar' style={{borderBottom: '1px solid #EAEDF1'}}>
        <img src={this.props.comment.author.avatar} width='30' height='30' style={{verticalAlign:'top',top:10,position:'relative'}} />
        <div className='inbox-avatar-name'>
          <div className='fg-darkgrayishblue75'>{this.props.comment.author.name}</div>
          <div className='fg-text'><small>{this.props.comment.content}</small></div>
        </div>
        <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
          <div><small><strong>{create_at}</strong></small></div>
        </div>
      </div>
    )
  }
});

var Comments = React.createClass({
  render: function () {
    var comments = {};
    var expandedMoreComment = false;
    if(this.props.post.morecomments){
      expandedMoreComment = true;
      this.props.post.morecomments.forEach(function (c) {
        comments['comment-' + c._id] = <SingleComment comment={c}/>;
      });
    }else {
      this.props.post.comments.forEach(function (c) {
        comments['comment-' + c._id] = <SingleComment comment={c}/>;
      });
    }
    var hideMoreComment = false;
    if(this.props.post.comment_count < 3)
      hideMoreComment = true;
    var moreCommentClass = classSet({
      'hide':hideMoreComment
    });
    return (
      <PanelFooter style={{padding: 25, paddingTop: 0, paddingBottom: 0}} className="bg-gray">
        <MoreComments className={moreCommentClass} expanded={expandedMoreComment} post={this.props.post}/>
        {comments}
      </PanelFooter>
    );
  }
});


module.exports = Comments;