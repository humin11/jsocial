var classSet = React.addons.classSet;
var moment = require('moment');
moment.locale('zh-cn');
var MoreComments = require('./more_comments.jsx');
var Authentication = require('../../mixins/authentication.jsx');

var SingleComment = React.createClass({
  mixins:[Authentication],
  render: function () {
    var create_at = moment(this.props.comment.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
    var editFlag = false;
    if(this.state.isLoggedIn && this.state.user._id == this.props.comment.author._id){
      editFlag = true;
    }
    text = l20n.ctx.getSync('modify',null);

    var toolbar = <span>{text}<Icon glyph='icon-feather-circle-cross'/></span>;
    return (
      <div className='comment' style={{borderBottom: '1px solid #EAEDF1'}}>
        <img src={this.props.comment.author.avatar} />
        <div className='comment-main'>
          <div className='comment-avatar-name fg-darkgrayishblue75'>{this.props.comment.author.name}</div>
          <div className='comment-date'>{create_at}</div>
          <div className='fg-text comment-content'>{this.props.comment.content}</div>
        </div>
        <div className='comment-toolbar hidden-sm hidden-xs fg-text text-right'>
          {toolbar}
        </div>
      </div>
    )
  }
});

var Comments = React.createClass({
  destroyScrollbar: function() {
    $(this.refs.commentsMain.getDOMNode()).perfectScrollbar('destroy');
  },
  initializeScrollbar: function() {
    $(this.refs.commentsMain.getDOMNode()).perfectScrollbar({
      suppressScrollX: true
    });
  },
  componentDidMount: function() {
    if(!Modernizr.touch) {
      this.initializeScrollbar();
    }
  },
  componentWillUnmount: function() {
    this.destroyScrollbar();
  },
  render: function () {
    var comments = {};
    var commentArray = this.props.post.comments;
    if(this.props.expanded)
      commentArray = this.props.post.morecomments;
    commentArray.forEach(function (c) {
      comments['comment-' + c._id] = <SingleComment comment={c}/>;
    });
    var hideMoreComment = false;
    if(this.props.post.comment_count < 3)
      hideMoreComment = true;
    var moreCommentClass = classSet({
      'hide':hideMoreComment,
      'morecomments':true
    });
    return (
      <PanelFooter style={{padding: 25, paddingTop: 0, paddingBottom: 0, backgroundColor:'#f5f5f5'}} >
        <MoreComments className={moreCommentClass} expanded={this.props.expanded} post={this.props.post}/>
        <div ref="commentsMain" className="comments">
          {comments}
        </div>
      </PanelFooter>
    );
  }
});


module.exports = Comments;