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

var classSet = React.addons.classSet;

var Body = React.createClass({
  render: function() {
    return (
      <Container id='body' className='users'>
        <Grid>
          <Row><Col sm={4} collapseRight ></Col></Row>
          <Row>
            <Col sm={4} collapseRight>
              [**{this.props.models.user.get().username}**]
              <UserInfo models={this.props.models}/>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
});

var Users = React.createClass({
  mixins: [StoreMixin,SidebarMixin],
  getInitialState: function (){
    return {useStores:["users_store"]};
  },
  render: function () {
    console.log(1);
    console.log(this.state.models);
    console.log(this.state.stores);
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar models={this.state.models} stores={this.state.stores}/>
        <Header pressed/>
        <Body models={this.state.models} stores={this.state.stores}/>
        <Footer />
      </Container>
    );
  }
});

module.exports = Users;