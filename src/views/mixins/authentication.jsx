var UsersStore = require("../stores/users_store.jsx");
var LoginPage = require("../app/login.jsx");

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!UsersStore.isLoggedIn()) {
        LoginPage.attemptedTransition = transition;
        transition.redirect("/login");
      }
    }
  }
};

module.exports = Authentication;
