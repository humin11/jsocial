var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var UsersStore = require('../../stores/users_store.jsx');

var MoreComments = React.createClass({
  getDefaultProps: function(){
    return {
      expanded: false
    };
  },
  _handleClick:function(){
    if(this.props.expanded){
      ReactBootstrap.Dispatcher.emit('morecomments:collapse',this.props.post._id);
    }else{
      AppDispatcher.dispatch({
        type: ActionTypes.COMMENTS_MORE,
        data: {source:{_id:this.props.post._id,type:'post'}}
      });
    }
  },
  render: function(){
    var text = null;
    var icon = null;
    if(this.props.expanded){
      text = l20n.ctx.getSync('hideCommentCount',null);
      icon = <Icon glyph='icon-ikons-arrow-up' />;
    } else {
      var commentCountText = l20n.ctx.getSync('commentCount',null);
      text = this.props.post.comment_count + commentCountText;
      icon = <Icon glyph='icon-ikons-arrow-down' />;
    }
    return (
      <Grid className={this.props.className} style={{marginTop:'5px',cursor:'pointer'}} onClick={this._handleClick}>
        <Row style={{marginLeft:'-50px'}}>
          <Col xs={4}>{text}</Col>
          <Col xs={2} style={{margin:'2px 0 0 -60px'}}>{icon}</Col></Row>
      </Grid>
    );
  }
});

module.exports = MoreComments;