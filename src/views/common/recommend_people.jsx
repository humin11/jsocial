/**
 * Created by steven on 15/4/9.
 */
var Follow = require('./follow.jsx');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var RecommendStore = require('../stores/recommend_store.jsx');
var UsersStore = require('../stores/users_store.jsx');

var Recommend = React.createClass({
  getInitialState: function() {
    return {
      isLoggedIn: UsersStore.isLoggedIn(),
      people: RecommendStore.getRecommendPeople()
    };
  },
  componentDidMount: function() {
    RecommendStore.addChangeListener(this._onChange);
    UsersStore.addChangeListener(this._onChange);
    AppDispatcher.dispatch({ type: ActionTypes.RECOMMEND_PEOPLE });
  },
  componentWillUnmount: function() {
    RecommendStore.removeChangeListener(this._onChange);
    UsersStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({
      isLoggedIn: UsersStore.isLoggedIn(),
      people: RecommendStore.getRecommendPeople()
    });
  },
  render: function(){
    if(!this.state.isLoggedIn || !this.state.people)
      return null;
    var users = {};
    this.state.people.forEach(function(p) {
      users['recommend-people-' + p._id] =
        <Row className='recommend-person'>
          <Col xs={12} >
            <div className='inbox-avatar'>
              <img src={p.avatar} width='40' height='40' style={{verticalAlign:'top',position:'relative'}} />
              <div className='inbox-avatar-name'>
                <div className='fg-darkgrayishblue75'>{p.name}</div>
              </div>
              <div className='inbox-date text-right'>
                <Follow user={p} ></Follow>
              </div>
            </div>
          </Col>
        </Row>
    });
    return (
      <PanelContainer noControls id="recommend-people">
        <PanelHeader className='bg-orange75 fg-white '>
          <Grid>
            <Row>
              <Col xs={12}>
                <h4><Entity entity='recommendPeople'/></h4>
              </Col>
            </Row>
          </Grid>
        </PanelHeader>
        <PanelBody style={{padding: 12.5}}>
          <Grid className="recommend-people">
            {users}
          </Grid>
        </PanelBody>
      </PanelContainer>
    );
  }
});


module.exports = Recommend;