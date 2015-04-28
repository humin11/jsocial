var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var classSet = React.addons.classSet;
var moment = require('moment');
moment.locale('zh-cn');

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');

var Recommend = require('./user/recommend_people.jsx');
var NewPost = require('./posts/new_post.jsx');
var SinglePost = require('./posts/post.jsx');
var StoreMixin = require('../mixins/store_mixin');
var PostsStore = require('../stores/posts_store.jsx');


var Body = React.createClass({
  getInitialState: function () {
    return {
      data: this.props.models.posts.get()
    };
  },
  componentDidMount: function() {
    $('html').addClass('social');
    this.props.stores.PostsStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    $('html').removeClass('social');
    this.props.stores.PostsStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({data: this.props.models.posts.get()});
  },
  render: function() {
    var stream = [];
    for(var i=0;i<this.state.data.length;i++){
      var obj = this.state.data[i];
      var index = i % 3;
      if(stream[index])
        stream[index].push(<SinglePost models={this.props.models} stores={this.props.stores} key={obj._id} post={obj} />);
      else
        stream[index] = [<SinglePost models={this.props.models} stores={this.props.stores} key={obj._id} post={obj} />];
    }
    return (
      <Container id='body' className='social dropdown'>
        <Grid>
          <Row><Col sm={4} collapseRight ></Col></Row>
          <Row>
            <Col sm={4} collapseRight >
              <NewPost models={this.props.models} stores={this.props.stores}></NewPost>
              {stream[1]}
            </Col>
            <Col sm={4} collapseRight >
              {stream[0]}
            </Col>
            <Col sm={4} collapseRight >
              <Recommend models={this.props.models} stores={this.props.stores} className="hidden-sm hidden-xs"></Recommend>
              {stream[2]}
            </Col>
          </Row>
        </Grid>
        {this.props.children}
      </Container>
    );
  }
});


var Posts = React.createClass({
  mixins: [StoreMixin,SidebarMixin],
  componentWillMount: function(){

  },
  componentDidMount: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.USERS_INIT
    });
    AppDispatcher.dispatch({
      type: ActionTypes.POSTS_INIT
    });
  },
  render: function() {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar {...this.state}/>
        <Header pressed />
        <Body {...this.state}/>
      </Container>
    );
  }
});

module.exports = Posts;
