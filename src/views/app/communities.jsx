var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var classSet = React.addons.classSet;

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var StoreMixin = require('../mixins/store_mixin');

var Body = React.createClass({
  componentDidMount: function() {
    $('html').addClass('communities');
  },
  componentWillUnmount: function() {
    $('html').removeClass('communities');
  },
  _onChange: function() {
  },
  render: function() {
    return (
      <Container id='body' className='communities'>
        <Grid>
          <Row >
            <Col sm={12}>
              <h3><Entity entity='communityJoined'/></h3>
            </Col>
          </Row>
          <Row>
            <Col sm={3} collapseRight >
              <PanelContainer noControls>
                <Grid className="community">
                  <Row>
                    <Col sm={4}>
                      <img src="/imgs/covers/0.jpg" width="80" height="80" />
                    </Col>
                    <Col sm={8} className="community-content">
                      <div>就爱吃草莓</div>
                      <div>123123位成员</div>
                    </Col>
                  </Row>
                </Grid>
              </PanelContainer>
            </Col>
            <Col sm={3} collapseRight >
              <PanelContainer noControls>
                <Grid className="community">
                  <Row>
                    <Col sm={4}>
                      <img src="/imgs/covers/1.jpg" width="80" height="80" />
                    </Col>
                    <Col sm={8} className="community-content">
                      <div>土豆团</div>
                      <div>123123位成员</div>
                    </Col>
                  </Row>
                </Grid>
              </PanelContainer>
            </Col>
            <Col sm={3} collapseRight >
              <PanelContainer noControls>
                <Grid className="community">
                  <Row>
                    <Col sm={4}>
                      <img src="/imgs/covers/2.jpg" width="80" height="80" />
                    </Col>
                    <Col sm={8} className="community-content">
                      <div>蚯蚓战士</div>
                      <div>123123位成员</div>
                    </Col>
                  </Row>
                </Grid>
              </PanelContainer>
            </Col>
            <Col sm={3} collapseRight >

            </Col>
          </Row>
          <Row >
            <Col sm={12}>
              <h3><Entity entity='communityInterest'/></h3>
            </Col>
          </Row>
          <Row>
            <Col sm={3} collapseRight >

            </Col>
            <Col sm={3} collapseRight >

            </Col>
            <Col sm={3} collapseRight >

            </Col>
            <Col sm={3} collapseRight >

            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
});

var Communities = React.createClass({
  mixins: [StoreMixin,SidebarMixin],
  componentWillMount: function(){

  },
  componentDidMount: function() {

  },
  render: function() {
    var classes = classSet({
      'container-open': false
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar {...this.state}/>
        <Header pressed />
        <Body {...this.state}/>
        <Footer />
      </Container>
    );
  }
});

module.exports = Communities;