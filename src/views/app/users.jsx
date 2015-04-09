/**
 * Created by steven on 15/4/9.
 */
var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var UsersStore = require('../stores/users_store.jsx');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');

var classSet = React.addons.classSet;
var Body = React.createClass({
  getInitialState: function () {
    return {data: null};
  },
  render: function() {
    return (
      <Container id='body' className='users'>

      </Container>
    );
  }
});

var Users = React.createClass({
  mixins: [SidebarMixin],
  render: function() {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header pressed />
        <Body/>
        <Footer />
      </Container>
    );
  }
});

module.exports = Users;