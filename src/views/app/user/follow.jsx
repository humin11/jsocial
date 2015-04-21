/**
 * Created by steven on 15/4/9.
 */
var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var UsersStore = require('../../stores/users_store.jsx');
var ReactDom = require('../../mixins/data_mixin.jsx');

var Follow = React.createClass({
  mixins: [ReactDom],
  getInitialState: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.FOLLOW_INIT
    });
    return {
      followed: this.getData("followed","hasFollowed",false,this.props.person._id)
    };
  },
  _handleFollow: function(){
    if(this.state.followed){
      AppDispatcher.dispatch({
        type: ActionTypes.FOLLOW_REMOVE,
        person:this.props.person
      });
    }else{
      AppDispatcher.dispatch({
        type: ActionTypes.FOLLOW_ADD,
        person:this.props.person
      });
    }
  },
  componentDidMount: function() {
    this.addChangeListener("FollowedStore",this._onChange);
  },
  componentWillUnmount: function() {
    this.removeChangeListener("FollowedStore",this._onChange);
  },
  _onChange: function(){
    console.log("_onChange");
    console.log(this.state.followed);
    console.log(this.getData("followed","hasFollowed",false,this.props.person._id));
    this.setState({
      followed: this.getData("followed","hasFollowed",false,this.props.person._id)
    });
  },
  render: function(){
    var text = this.state.followed ? <Entity entity='unfollow'/> : <Entity entity='follow'/>;
    return (
      <Button xs outlined bsStyle='default' onClick={this._handleFollow}>
        <span style={{marginLeft:'5px'}}>{text}</span>
      </Button>
    );
  }
});


module.exports = Follow;