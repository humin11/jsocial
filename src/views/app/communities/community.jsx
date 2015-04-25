var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');
var classSet = React.addons.classSet;

var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var StoreMixin = require('../../mixins/store_mixin');
var NewPost = require('../posts/new_post.jsx');
var SinglePost = require('../posts/post.jsx');

var CommunityMember = React.createClass({
  render: function () {
    var stream = [];
    for(var i=0;i<24;i++) {
      var index = i % 6;
      if(stream[index])
        stream[index].push(<img src="/imgs/avatars/avatar3.png" width="33" height="33"/>);
      else
        stream[index] = [<img src="/imgs/avatars/avatar3.png" width="33" height="33"/>];
    }
    return (
      <Grid className="community-members">
        <Row>
          <Col sm={6} xs={6} className="text-left">
            所有成员
          </Col>
          <Col sm={6} xs={6} className="text-right">
            634,232 个成员
          </Col>
        </Row>
        <Row>
          <Col sm={2} xs={2}>
            {stream[0]}
          </Col>
          <Col sm={2} xs={2}>
            {stream[1]}
          </Col>
          <Col sm={2} xs={2}>
            {stream[2]}
          </Col>
          <Col sm={2} xs={2}>
            {stream[3]}
          </Col>
          <Col sm={2} xs={2}>
            {stream[4]}
          </Col>
          <Col sm={2} xs={2}>
            {stream[5]}
          </Col>
        </Row>
      </Grid>
    )
  }
});

var CommunityCategory = React.createClass({
  render: function () {
    return (
      <div className="category-list">
        <Link to="/community">
          <div>
            <Entity entity="communityAllPost"/>
          </div>
        </Link>
        <Link to="/community/1/1" style={{textDecoration:'none'}}>
          <div>
            <Entity entity="communityTextPost"/>
          </div>
        </Link>
        <Link to="/community/1/2">
          <div>
            <Entity entity="communityImagePost"/>
          </div>
        </Link>
        <Link to="/community/1/3">
          <div>
            <Entity entity="communityGIFPost"/>
          </div>
        </Link>
        <Link to="/community/1/4">
          <div>
            <Entity entity="communityVideoPost"/>
          </div>
        </Link>
        <Link to="/community/events">
          <div>
            <Entity entity="communityEvent"/>
          </div>
        </Link>
        <Link to="/community/photos/all">
          <div>
            <Entity entity="communityPhoto"/>
          </div>
        </Link>
      </div>
    );
  }
});

var CommunityDetail = React.createClass({
  render: function () {
    return (
      <PanelContainer noControls className="community-detail">
        <PanelBody style={{ paddingLeft:'12.5px'}}>
          <h3 style={{marginTop:0,fontWeight:'normal'}}>就爱吃草莓</h3>
          <div style={{color:'#aaa',marginBottom:'20px'}}>草莓有的是~</div>
          <div className="pull-right community-toolbar">
            <span style={{marginRight:'120px',color:'#ccc',fontSize:'16px',textDecoration: 'underline'}}>已关闭通知</span>
            <Icon glyph="icon-fontello-cog-1" style={{fontSize: 24}} className="fg-darkgray"/>
          </div>
          <div style={{position:'relative',cursor:'pointer'}}>
            <img src="/imgs/covers/0.jpg" width="265" height="265" style={{margin:"12.5px 0 0 -12.5px"}}/>
            <div className="community-summary">
              <Entity entity='communityMemberCount' data={{num:'62,232'}}/>
            </div>
          </div>
        </PanelBody>
        <CommunityCategory />
        <CommunityMember />
      </PanelContainer>
    );
  }
});


var Body = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.models.posts.get()
    };
  },
  componentDidMount: function () {
    $('html').addClass('communities');
    this.props.stores.PostsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    $('html').removeClass('communities');
    this.props.stores.PostsStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({data: this.props.models.posts.get()});
  },
  render: function () {
    var stream = [];
    for(var i=0;i<this.state.data.length;i++){
      var obj = this.state.data[i];
      var index = i % 2;
      if(stream[index])
        stream[index].push(<SinglePost models={this.props.models} stores={this.props.stores} key={obj._id} post={obj} />);
      else
        stream[index] = [<SinglePost models={this.props.models} stores={this.props.stores} key={obj._id} post={obj} />];
    }
    return (
      <Container id='body' className='communities'>
        <Grid>
          <Row><Col sm={4} collapseRight ></Col></Row>
          <Row>
            <Col sm={3} collapseRight >
              <CommunityDetail />
            </Col>
            <Col sm={4} collapseRight >
              <NewPost models={this.props.models} stores={this.props.stores}></NewPost>
              {stream[0]}
            </Col>
            <Col sm={4} collapseRight >
              {stream[1]}
            </Col>
          </Row>
        </Grid>
        {this.props.children}
      </Container>
    );
  }
});

var Community = React.createClass({
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

module.exports = Community;