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
    console.log("------");
    console.log(this.props.models.user);
    return {
      user: this.props.models.user,
      store: this.props.stores.UsersStore,
      isLoggedIn: this.props.models.user.isLoggedIn()
    };
  },
  componentDidMount: function () {
    if (this.state.store)
      this.state.store.addChangeListener(this._onLogin);
  },
  componentWillUnmount: function () {
    if (this.state.store)
      this.state.store.removeChangeListener(this._onLogin);
  },
  _onLogin: function (user, store) {
    this.setState({
      user: user,
      store: store
    });
  }
};

module.exports = Authentication;
