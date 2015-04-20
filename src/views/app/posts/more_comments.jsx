var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var Authentication = require('../../mixins/auth_mixin.jsx');

var MoreComments = React.createClass({
  mixins:[Authentication],
  getDefaultProps: function(){
    return {
      expanded: false
    };
  },
  getInitialState: function () {
    return {
      entity: ''
    };
  },
  componentDidMount: function() {
    ReactBootstrap.Dispatcher.on('morecomments:change',this._onChange);
    ReactBootstrap.Dispatcher.on('morecomments:expand',this._showHide);
    ReactBootstrap.Dispatcher.on('morecomments:collapse',this._showCount);
    l20n.ctx.localize(['commentCount'], function(l) {
      this.setState({
        entity: l20n.ctx.getSync('commentCount',{num:this.props.post.comment_count})
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    ReactBootstrap.Dispatcher.off('morecomments:change',this._onChange);
    ReactBootstrap.Dispatcher.off('morecomments:expand',this._showHide);
    ReactBootstrap.Dispatcher.off('morecomments:collapse',this._showCount);
  },
  _onChange: function(post) {
    if(post._id == this.props.post._id) {
      this.setState({
        entity: l20n.ctx.getSync('commentCount',{num:post.comment_count})
      });
    }
  },
  _showHide: function(id) {
    if(id == this.props.post._id) {
      this.setState({
        entity: l20n.ctx.getSync('hideCommentCount')
      });
    }
  },
  _showCount: function(id){
    if(id == this.props.post._id) {
      this.setState({
        entity: l20n.ctx.getSync('commentCount',{num:this.props.post.comment_count})
      });
    }
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
    var text = this.state.entity;
    var icon = <Icon glyph='icon-ikons-arrow-down' />;
    if(this.props.expanded){
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