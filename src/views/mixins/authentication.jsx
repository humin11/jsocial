var AuthStore = require("../stores/auth_store.jsx");
var LoginPage = require("../app/login.jsx");

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!AuthStore.isLoggedIn()) {
        LoginPage.attemptedTransition = transition;
        transition.redirect("/login");
      }
    }
  }
};

module.exports = Authentication;
