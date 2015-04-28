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
var PostsStore = require('../stores/posts_store.jsx');

var Body = React.createClass({
  getInitialState: function () {
    return {
      data: PostsStore.get().get()
    };
  },
  componentDidMount: function() {
    $('html').addClass('social');
    PostsStore.addChangeListener(this._onChange);
    AppDispatcher.dispatch({
      type: ActionTypes.POSTS_INIT
    });
  },
  componentWillUnmount: function() {
    $('html').removeClass('social');
    PostsStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({data: PostsStore.get().get()});
  },
  render: function() {
    var stream = [];
    for(var i=0;i<this.state.data.length;i++){
      var obj = this.state.data[i];
      var index = i % 3;
      if(stream[index])
        stream[index].push(<SinglePost key={obj._id} post={obj} />);
      else
        stream[index] = [<SinglePost key={obj._id} post={obj} />];
    }
    return (
      <Container id='body' className='social dropdown'>
        <Grid>
          <Row>
            <Col sm={4} collapseRight style={{padding:"5px 5px"}}>
              <NewPost />
              {stream[1]}
            </Col>
            <Col sm={4} collapseRight style={{padding:"5px 5px"}}>
              {stream[0]}
            </Col>
            <Col sm={4} collapseRight style={{padding:"5px 5px"}}>
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
        <Sidebar {...this.state}/>
        <Header pressed />
        <Body {...this.state}/>
      </Container>
    );
  }
});

module.exports = Posts;
