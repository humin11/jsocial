var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var classSet = React.addons.classSet;
var moment = require('moment');
moment.locale('zh-cn');

var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var PostStore = require('../stores/posts_store.jsx');
var UsersStore = require('../stores/users_store.jsx');

var Recommend = require('./user/recommend_people.jsx');
var NewPost = require('./posts/new_post.jsx');
var PostSummary = require('./posts/post.jsx');



var Body = React.createClass({
  getInitialState: function() {
    return {data: PostStore.getPosts()};
  },
  componentDidMount: function() {
    $('html').addClass('social');
    PostStore.addChangeListener(this._onChange);
    AppDispatcher.dispatch({ type: ActionTypes.POSTS_INIT });
  },
  componentWillUnmount: function() {
    $('html').removeClass('social');
    PostStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({data: PostStore.getPosts()});
  },
  render: function() {
    var stream = [];
    for(var i=0;i<this.state.data.length;i++){
      var obj = this.state.data[i];
      var index = i % 3;
      if(stream[index])
        stream[index].push(<PostSummary key={obj._id} post={obj} />);
      else
        stream[index] = [<PostSummary key={obj._id} post={obj} />];
    }
    return (
      <Container id='body' className='social'>
        <Grid>
          <Row><Col sm={4} collapseRight ></Col></Row>
          <Row>
            <Col sm={4} collapseRight>
              <NewPost></NewPost>
              {stream[0]}
            </Col>
            <Col sm={4} collapseRight>
              {stream[1]}
            </Col>
            <Col sm={4} collapseRight>
              <Recommend className="hidden-sm hidden-xs"></Recommend>
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
  mixins: [SidebarMixin],
  componentWillMount: function(){

  },
  componentDidMount: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.USERS_INIT
    });
  },
  render: function() {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header pressed />
        <Body/>
        <Footer />
      </Container>
    );
  }
});

module.exports = Posts;
