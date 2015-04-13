var UsersStore = require("../stores/users_store.jsx");
var LoginPage = require("../app/login.jsx");

var Authentication = {
  //statics: {
  //  willTransitionTo: function (transition) {
  //    if (!UsersStore.isLoggedIn()) {
  //      LoginPage.attemptedTransition = transition;
  //      transition.redirect("/login");
  //    }
  //  }
  //}
  getInitialState: function () {
    return {
      user: UsersStore.getUser(),
      isLoggedIn: UsersStore.isLoggedIn()
    };
  },
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onLogin);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onLogin);
  },
  _onLogin: function(){
    this.setState({
      user: UsersStore.getUser(),
      isLoggedIn: UsersStore.isLoggedIn()
    });
  }
};

module.exports = Authentication;
