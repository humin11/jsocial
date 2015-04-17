var Authentication = {
  getInitialState: function () {
    var user = this.props.models ? this.props.models.user : null;
    var store = this.props.stores ? this.props.stores.UsersStore : null;
    var islogin = user ? user.isLoggedIn():false;
    return {
      user: user,
      store: store,
      isLoggedIn: islogin
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
