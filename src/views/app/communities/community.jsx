var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');
var classSet = React.addons.classSet;

var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var StoreMixin = require('../../mixins/store_mixin');
var NewPost = require('../posts/new_post.jsx');
var SinglePost = require('../posts/post.jsx');

var CommunityDetail = React.createClass({
  render: function () {
    return (
      <PanelContainer noControls>
        <PanelBody style={{ padding:'0 25px 25px 25px'}} >
          <h3>就爱吃草莓</h3>
          <div>草莓有的是~</div>
          <img src="/imgs/covers/0.jpg" width="265" height="265" style={{margin:"12.5px 0 25px -25px"}}/>
        </PanelBody>
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