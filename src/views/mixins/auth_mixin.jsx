var AuthMixin = {
  getInitialState: function () {
    var user = this.props.models ? this.props.models.user : null;
    var store = this.props.stores ? this.props.stores.UsersStore : null;
    var islogin = user ? user.isLoggedIn():false;
    var _user = user ? user.get():false;
    return {
      user: _user,
      store: store,
      isLoggedIn: islogin
    };
  },
  componentDidMount: function () {
    if (this.props.store)
      this.props.store.addChangeListener(this._onLogin);
  },
  componentWillUnmount: function () {
    if (this.props.store)
      this.props.store.removeChangeListener(this._onLogin);
  },
  _onLogin: function (user, store) {
    this.setState({
      user: user,
      store: store
    });
  }
};

module.exports = AuthMixin;
