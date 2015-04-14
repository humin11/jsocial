var classSet = React.addons.classSet;
var moment = require('moment');
moment.locale('zh-cn');
var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var MoreComments = require('./more_comments.jsx');
var Authentication = require('../../mixins/authentication.jsx');

var SingleComment = React.createClass({
  mixins:[Authentication],
  _handleLike: function(){

  },
  _handleDelete: function(){
    AppDispatcher.dispatch({
      type: ActionTypes.COMMENTS_DELETE,
      data: this.props.comment
    });
  },
  render: function () {
    var create_at = moment(this.props.comment.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
    var editFlag = false;
    if(this.state.isLoggedIn && this.state.user._id == this.props.comment.author._id){
      editFlag = true;
    }
    text = l20n.ctx.getSync('modify');
    var likeBtn = <Icon glyph='icon-fontello-thumbs-up-1 icon-1-and-quarter-x'/>;
    var replyBtn = <Icon glyph='icon-fontello-reply-1 icon-1-and-quarter-x'/>;
    var modifyBtn = null;
    var deleteBtn = null;
    if(editFlag){
      replyBtn = null;
      modifyBtn = <Icon glyph='icon-fontello-edit icon-1-and-quarter-x'/>;
      deleteBtn = <Icon glyph='icon-fontello-cancel-circle icon-1-and-quarter-x' onClick={this._handleDelete}/>;
    }
    return (
      <Grid className='comment'>
        <Row>
          <Col xs={2}>
            <img src={this.props.comment.author.avatar} className="comment-avatar"/>
          </Col>
          <Col xs={10} className='comment-main'>
            <Grid>
              <Row>
                <Col xs={6} style={{padding:0}}>
                  <div className='comment-avatar-name fg-darkgrayishblue75'>{this.props.comment.author.name}</div>
                  <div className='comment-date'>{create_at}</div>
                </Col>
                <Col xs={6} style={{padding:0}}>
                  <div className='comment-toolbar hidden-sm hidden-xs fg-text text-right'>
                    {likeBtn} {replyBtn} {modifyBtn} {deleteBtn}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} style={{padding:0}}>
                  <div className='comment-content'>{this.props.comment.content}</div>
                </Col>
              </Row>
            </Grid>
          </Col>
        </Row>
      </Grid>
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
      <PanelFooter style={{padding: '0 25px 0 25px', backgroundColor:'#f5f5f5'}} >
        <MoreComments className={moreCommentClass} expanded={this.props.expanded} post={this.props.post}/>
        <div ref="commentsMain" className="comments">
          {comments}
        </div>
      </PanelFooter>
    );
  }
});


module.exports = Comments;