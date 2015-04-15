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
      user: this.props.user,
      store: this.props.store
    };
  },
  componentDidMount: function () {
    if (this.state.store)
      store.addChangeListener(this._onLogin);
  },
  componentWillUnmount: function () {
    if (this.state.store)
      store.removeChangeListener(this._onLogin);
  },
  _onLogin: function (user, store) {
    this.setState({
      user: user,
      store: store
    });
  }
};

module.exports = Authentication;
