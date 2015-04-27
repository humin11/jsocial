var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var moment = require('moment');
moment.locale('zh-cn');
var classSet = React.addons.classSet;
var Person = React.createClass({
  mixins: [Authentication],
  getInitialState: function () {
    return {
    };
  },
  componentDidMount: function () {

  },
  componentWillUnmount: function () {

  },
  render: function() {
    return <div class="circle-div">
    </div>
  }
});
module.exports = Person;