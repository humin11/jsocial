var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var classSet = React.addons.classSet;

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var StoreMixin = require('../mixins/store_mixin');

var MyCommunity = React.createClass({
  mixins: [ReactRouter.State, ReactRouter.Navigation],
  _handleClick:function(){
    this.transitionTo("/community");
  },
  render: function() {
    return (
      <PanelContainer noControls onClick={this._handleClick}>
        <Grid className="mycommunity">
          <Row>
            <Col xs={4}>
              <img src={this.props.community.cover} width="80" height="80" />
            </Col>
            <Col xs={8} className="mycommunity-content">
              <div>{this.props.community.title}</div>
              <div><Entity entity='communityMemberCount' data={{num:this.props.community.member_count}}/></div>
            </Col>
          </Row>
        </Grid>
      </PanelContainer>
    )
  }
});

var InterestCommunity = React.createClass({
  render: function() {
    return (
      <PanelContainer noControls>
        <Grid className="othercommunity">
          <Row>
            <Col xs={12} style={{padding:0}}>
              <img src={this.props.community.cover} width="266" height="265" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="othercommunity-content">
              <div className="othercommunity-title">{this.props.community.title}</div>
              <div className="othercommunity-detail">
                <Entity entity='communityMemberCount' data={{num:this.props.community.member_count}}/>&nbsp;&nbsp;
                <Entity entity='communityPostCount' data={{num:this.props.community.post_count}}/>
              </div>
              <div className="othercommunity-toolbar">
                <Button style={{borderWidth:'1px'}} xs outlined bsStyle='default' >
                  <span style={{color:'#404040'}}><Entity entity='join'/></span>
                </Button>
              </div>
            </Col>
          </Row>
        </Grid>
      </PanelContainer>
    )
  }
});

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
              <MyCommunity community={{cover:"/imgs/covers/0.jpg",title:"就爱吃草莓",member_count:"3,123",post_count:"56"}} />
            </Col>
            <Col sm={3} collapseRight >
              <MyCommunity community={{cover:"/imgs/covers/1.jpg",title:"土豆团",member_count:"541",post_count:"123"}} />
            </Col>
            <Col sm={3} collapseRight >
              <MyCommunity community={{cover:"/imgs/covers/2.jpg",title:"蚯蚓战士",member_count:"19",post_count:"43"}} />
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
              <InterestCommunity community={{cover:"/imgs/covers/5.jpg",title:"抢菜黑涩会",member_count:"123",post_count:"3123"}} />
            </Col>
            <Col sm={3} collapseRight >
              <InterestCommunity community={{cover:"/imgs/covers/6.jpg",title:"切西瓜不切菜",member_count:"32",post_count:"233"}} />
            </Col>
            <Col sm={3} collapseRight >
              <InterestCommunity community={{cover:"/imgs/covers/8.jpg",title:"大番薯",member_count:"7",post_count:"32"}} />
            </Col>
            <Col sm={3} collapseRight >
              <InterestCommunity community={{cover:"/imgs/covers/9.jpg",title:"有机绿色社",member_count:"12,331",post_count:"4,123"}} />
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
});

var Communities = React.createClass({
  mixins: [StoreMixin,SidebarMixin,ReactRouter.State, ReactRouter.Navigation],
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