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
    if(this.state.followed){
      AppDispatcher.dispatch({
        type: ActionTypes.USERS_UNFOLLOW,
        user:this.props.user
      });
    }else{
      AppDispatcher.dispatch({
        type: ActionTypes.USERS_FOLLOW,
        user:this.props.user
      });
    }
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
    var text = null;
    if(this.state.followed) {
      text = <Entity entity='unfollow'/>;
    }else{
      text = <Entity entity='follow'/>;
    }
    return (
      <Button xs outlined bsStyle='default' onClick={this._handleFollow}>
        <Icon bundle='fontello' glyph='user'/>
        <span style={{marginLeft:'5px'}}>{text}</span>
      </Button>
    );
  }
});


module.exports = Follow;