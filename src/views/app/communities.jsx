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
                <Grid className="mycommunity">
                  <Row>
                    <Col sm={4}>
                      <img src="/imgs/covers/0.jpg" width="80" height="80" />
                    </Col>
                    <Col sm={8} className="mycommunity-content">
                      <div>就爱吃草莓</div>
                      <div>123123位成员</div>
                    </Col>
                  </Row>
                </Grid>
              </PanelContainer>
            </Col>
            <Col sm={3} collapseRight >
              <PanelContainer noControls>
                <Grid className="mycommunity">
                  <Row>
                    <Col sm={4}>
                      <img src="/imgs/covers/1.jpg" width="80" height="80" />
                    </Col>
                    <Col sm={8} className="mycommunity-content">
                      <div>土豆团</div>
                      <div>123123位成员</div>
                    </Col>
                  </Row>
                </Grid>
              </PanelContainer>
            </Col>
            <Col sm={3} collapseRight >
              <PanelContainer noControls>
                <Grid className="mycommunity">
                  <Row>
                    <Col sm={4}>
                      <img src="/imgs/covers/2.jpg" width="80" height="80" />
                    </Col>
                    <Col sm={8} className="mycommunity-content">
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
              <PanelContainer noControls>
                <Grid className="othercommunity">
                  <Row>
                    <Col sm={12} style={{padding:0}}>
                      <img src="/imgs/covers/5.jpg" width="266" height="265" />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className="othercommunity-content">
                      <div className="othercommunity-title">抢菜黑涩会</div>
                      <div className="othercommunity-detail">123位成员 3,123条消息</div>
                      <div className="othercommunity-toolbar">
                        <Button style={{borderWidth:'1px'}} xs outlined bsStyle='default' >
                          <span style={{color:'#404040'}}><Entity entity='join'/></span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Grid>
              </PanelContainer>
            </Col>
            <Col sm={3} collapseRight >
              <PanelContainer noControls>
                <Grid className="othercommunity">
                  <Row>
                    <Col sm={12} style={{padding:0}}>
                      <img src="/imgs/covers/6.jpg" width="266" height="265" />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className="othercommunity-content">
                      <div className="othercommunity-title">切西瓜不切菜</div>
                      <div className="othercommunity-detail">32位成员 233条消息</div>
                      <div className="othercommunity-toolbar">
                        <Button style={{borderWidth:'1px'}} xs outlined bsStyle='default' >
                          <span style={{color:'#404040'}}><Entity entity='join'/></span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Grid>
              </PanelContainer>
            </Col>
            <Col sm={3} collapseRight >
              <PanelContainer noControls>
                <Grid className="othercommunity">
                  <Row>
                    <Col sm={12} style={{padding:0}}>
                      <img src="/imgs/covers/8.jpg" width="266" height="265" />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className="othercommunity-content">
                      <div className="othercommunity-title">大番薯</div>
                      <div className="othercommunity-detail">7位成员 56条消息</div>
                      <div className="othercommunity-toolbar">
                        <Button style={{borderWidth:'1px'}} xs outlined bsStyle='default' >
                          <span style={{color:'#404040'}}><Entity entity='join'/></span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Grid>
              </PanelContainer>
            </Col>
            <Col sm={3} collapseRight >
              <PanelContainer noControls>
                <Grid className="othercommunity">
                  <Row>
                    <Col sm={12} style={{padding:0}}>
                      <img src="/imgs/covers/9.jpg" width="266" height="265" />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className="othercommunity-content">
                      <div className="othercommunity-title">有机绿色社</div>
                      <div className="othercommunity-detail">12,331位成员 4,123条消息</div>
                      <div className="othercommunity-toolbar">
                        <Button style={{borderWidth:'1px'}} xs outlined bsStyle='default' >
                          <span style={{color:'#404040'}}><Entity entity='join'/></span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Grid>
              </PanelContainer>
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