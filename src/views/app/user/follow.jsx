/**
 * Created by steven on 15/4/9.
 */
var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var UsersStore = require('../../stores/users_store.jsx');
var ReactDom = require('../../mixins/react_Dom.jsx');

var Follow = React.createClass({
  mixins: [ReactDom],
  getInitialState: function() {
    return {
      followed: this.getData("user","hasFollowed",this.props.person._id)
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
    this.addChangeListener("UsersStore",this._onChange);
  },
  componentWillUnmount: function() {
    this.removeChangeListener("UsersStore",this._onChange);
  },
  _onChange: function(){
    this.setState({
      followed: this.getData("user","hasFollowed",this.props.person._id)
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

        <span style={{marginLeft:'5px'}}>{text}</span>
      </Button>
    );
  }
});


module.exports = Follow;