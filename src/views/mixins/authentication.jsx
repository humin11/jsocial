var AuthStore = require("../stores/auth.jsx");

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      if (!AuthStore.isLoggedIn()) {
        transition.redirect("/auth");
      }
    }
  }
};

module.exports = Authentication;
