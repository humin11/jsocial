/**
 * Created by steven on 15/4/9.
 */
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var UsersStore = require('../stores/users_store.jsx');
var Follow = React.createClass({
  getInitialState: function() {
    return {
      followed: UsersStore.hasFollowed(this.props.user._id)
    };
  },
  _handleFollow: function(){
    AppDispatcher.dispatch({
      type: ActionTypes.USERS_FOLLOW,
      user:this.props.user
    });
  },
  _handleUnfollow: function(){
    AppDispatcher.dispatch({
      type: ActionTypes.USERS_UNFOLLOW,
      user:this.props.user
    });
  },
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      followed: UsersStore.hasFollowed(this.props.user._id)
    });
  },
  render: function(){
    var btn = null;
    if(this.state.followed) {
      btn =
        <Button xs outlined bsStyle='default' onClick={this._handleUnfollow}>
          <Icon bundle='fontello' glyph='user'/>
          <span style={{marginLeft:'5px'}}><Entity entity='unfollow'/></span>
        </Button>;
    }else{
      btn =
        <Button xs outlined bsStyle='default' onClick={this._handleFollow}>
          <Icon bundle='fontello' glyph='user'/>
          <span style={{marginLeft:'5px'}}><Entity entity='follow'/></span>
        </Button>;
    }
    return (btn);
  }
});


module.exports = Follow;