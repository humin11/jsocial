var Authentication = {
  getInitialState: function () {
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
