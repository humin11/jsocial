var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var Authentication = require('../../mixins/authentication.jsx');

var MoreComments = React.createClass({
  mixins:[Authentication],
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
    var text = l20n.ctx.getSync('commentCount',{num:this.props.post.comment_count});
    var icon = <Icon glyph='icon-ikons-arrow-down' />;
    if(this.props.expanded){
      text = l20n.ctx.getSync('hideCommentCount',null);
      icon = <Icon glyph='icon-ikons-arrow-up' />;
    }
    return (
      <div className={this.props.className} onClick={this._handleClick}>
        <span className="morecomment-text"> {text} </span>
        {icon}
      </div>
    );
  }
});

module.exports = MoreComments;