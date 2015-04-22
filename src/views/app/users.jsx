/**
 * Created by steven on 15/4/9.
 */
var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var UserInfo = require('./user/base_info.jsx');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var StoreMixin = require('../mixins/store_mixin');
var ReactDom = require('../mixins/data_mixin.jsx');
var AllFollowed = require('./user/all_followed.jsx');

var classSet = React.addons.classSet;

var Body = React.createClass({
  mixins: [ReactDom],
  render: function() {
    return (
      <Container id='body' className='users'>
        <Grid>
          <Row><Col sm={4} collapseRight >
            <form action="/upload" method="post">
              <input type="text" name="title"/>
              <input type="file" name="file"/>
              <input type="submit" value="Upload"/>
            </form>
          </Col></Row>
          <Row>
            <Col sm={4} collapseRight>
              {this.getDefaultValue("user.username","")}
              <UserInfo {...this.props}/>
            </Col>
          </Row>
        </Grid>
        <AllFollowed {...this.props}/>
      </Container>
    );
  }
});

var Users = React.createClass({
  mixins: [StoreMixin,SidebarMixin],
  render: function () {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar {...this.state}/>
        <Header pressed/>
        <Body {...this.state}/>
        <Footer />
      </Container>
    );
  }
});

module.exports = Users;