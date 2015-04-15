/**
 * Created by steven on 15/4/9.
 */
var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var UsersStore = require('../stores/users_store.jsx');
var UserInfo = require('./user/base_info.jsx');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var UserModel =  require('../models/user_model');

var classSet = React.addons.classSet;

var Body = React.createClass({
  render: function() {
    return (
      <Container id='body' className='users'>
        <Grid>
          <Row><Col sm={4} collapseRight ></Col></Row>
          <Row>
            <Col sm={4} collapseRight>
              [**{this.props.user.get().username}**]
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
});

var Users = React.createClass({
  componentWillMount: function() {
    if (!this.props.server)
      SystemInitStore({UsersStore: UsersStore});
  },
  mixins: [SidebarMixin],
  render: function () {
    var user = this.props.user;
    var usersStore = null;
    if (!user) {
      user = UsersStore.get();
      usersStore = UsersStore;
    }
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar user={user} store={usersStore}/>
        <Header pressed/>
        <Body user={user} store={usersStore}/>
        <Footer />
      </Container>
    );
  }
});

module.exports = Users;