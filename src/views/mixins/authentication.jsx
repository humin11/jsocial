var AuthStore = require("../stores/auth_store.jsx");
var Login = require("../app/login.jsx");

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!AuthStore.isLoggedIn()) {
        Login.attemptedTransition = transition;
        transition.redirect("/login");
      }
    }
  }
};

module.exports = Authentication;
