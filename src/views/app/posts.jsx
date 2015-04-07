var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var moment = require('moment');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var PostStore = require('../stores/posts_store.jsx');
var Authentication = require('../mixins/authentication.jsx');

var SocialBanner = React.createClass({
  getInitialState: function() {
    return {
      follow: 'follow me',
      followActive: false,
      likeCount: 999,
      likeActive: false,
      likeTextStyle: 'fg-white'
    };
  },
  handleFollow: function() {
    this.setState({
      follow: 'followed',
      followActive: true
    });
  },
  handleLike: function() {
    this.setState({
      likeCount: 1000,
      likeActive: true,
      likeTextStyle: 'fg-orange75'
    });
  },
  render: function() {
    return (
      <div style={{height: 350, marginTop: -25, backgroundImage: 'url(/imgs/shots/Blick_auf_Manhattan.JPG)', backgroundSize: 'cover', position: 'relative', marginBottom: 25, backgroundPosition: 'center'}}>
        <div className='social-cover' style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        </div>
        <div className='social-desc'>
          <div>
            <h1 className='fg-white'>Empire State, NY, USA</h1>
            <h5 className='fg-white' style={{opacity: 0.8}}>- Aug 20th, 2014</h5>
            <div style={{marginTop: 50}}>
              <div style={{display: 'inline-block'}}>
                <Button id='likeCount' retainBackground rounded bsStyle='orange75' active={this.state.likeActive} onClick={this.handleLike}>
                  <Icon glyph='icon-fontello-heart-1' />
                </Button>
                <Label className='social-like-count' htmlFor='likeCount'><span className={this.state.likeTextStyle}>{this.state.likeCount} likes</span></Label>
              </div>
            </div>
          </div>
        </div>
        <div className='social-avatar'>
          <Img src='/imgs/avatars/avatar.jpg' height='100' width='100' style={{display: 'block', borderRadius: 100, border: '2px solid #fff', margin: 'auto', marginTop: 50}} />
          <h4 className='fg-white text-center'>Anna Sanchez</h4>
          <h5 className='fg-white text-center' style={{opacity: 0.8}}>DevOps Engineer, NY</h5>
          <hr className='border-black75' style={{borderWidth: 2}}/>
          <div className='text-center'>
            <Button outlined inverse retainBackground active={this.state.followActive} bsStyle='brightblue' onClick={this.handleFollow}>
              <span>{this.state.follow}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
});

var NewPost = React.createClass({
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  },
  handleClick: function(){
    var content = this.refs.postContent.getDOMNode().value;
    AppDispatcher.dispatch({
      type: ActionTypes.POSTS_CREATE,
      data: {content:content,comments:[]}
    });
  },
  render: function () {
    return (
      <PanelContainer noControls >
        <PanelBody style={{padding: 12.5}}>
          <Textarea rows='3' placeholder="What's on your mind?" style={{border: 'none'}} ref="postContent"/>
        </PanelBody>
        <PanelFooter className='fg-black75 bg-gray' style={{padding: '12.5px 25px'}}>
          <Grid>
            <Row>
              <Col xs={6} collapseLeft collapseRight>
                <a href='#' style={{border: 'none'}}><Icon glyph='icon-dripicons-location icon-1-and-quarter-x fg-text' style={{marginRight: 25}} /></a>
                <a href='#' style={{border: 'none'}}><Icon glyph='icon-dripicons-camera icon-1-and-quarter-x fg-text' style={{marginRight: 25}} /></a>
                <a href='#' style={{border: 'none'}}><Icon glyph='icon-dripicons-calendar icon-1-and-quarter-x fg-text' style={{marginRight: 25}} /></a>
              </Col>
              <Col xs={6} className='text-right' collapseLeft collapseRight>
                <Button onClick={this.handleClick} bsStyle='darkgreen45'>send</Button>
              </Col>
            </Row>
          </Grid>
        </PanelFooter>
      </PanelContainer>
    )
  }
});
var NewComment = React.createClass({
  getInitialState: function () {
    return {
      collapsed: true
    };
  },
  _onClick: function(){
    this.setState({collapsed:false});
  },
  render: function () {
    var item;
    if(this.state.collapsed)
      item = <Input type='text' placeholder='Write a comment...' onClick={this._onClick} style={{border: '1px solid #d8d8d8'}} />;
    else
      item =
        <div className="comment-editor-main bg-white">
          <div contentEditable placeholder='Write a comment...' className="comment-editor" ></div>
        </div>;
    return (
      <PanelFooter style={{marginTop:'0px', padding: 12.5, borderTop: 0}} className="bg-gray">
        {item}
      </PanelFooter>
    )
  }
});

var PostComment = React.createClass({
  getDefaultProps: function() {
    return {
      author:{
        name: "admin",
        avatar: "/imgs/avatars/avatar0.png"
      }

    };
  },
  render: function () {
    return (
      <div className='inbox-avatar' style={{borderBottom: '1px solid #EAEDF1'}}>
        <img src={this.props.author.avatar} width='30' height='30' style={{verticalAlign: 'top', top: 10, position: 'relative'}} />
        <div className='inbox-avatar-name'>
          <div className='fg-darkgrayishblue75'>{this.props.author.name}</div>
          <div className='fg-text'><small>{this.props.children}..</small></div>
        </div>
        <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
          <div><small><strong>{this.props.date}</strong></small></div>
        </div>
      </div>
    )
  }
});

var PostSummary = React.createClass({
  getDefaultProps: function() {
    return {
      author: {
        name: "admin",
        avatar: "/imgs/avatars/avatar0.png"
      }
    };
  },
  getInitialState: function () {
    return {
      shareCount: 200,
      shareActive: false,
      shareTextStyle: 'fg-white',
      likeCount: 999,
      likeActive: false,
      likeTextStyle: 'fg-white',
      comments: this.props.comments
    };
  },
  handleShare: function() {
    this.setState({
      shareCount: 1000,
      shareActive: true,
      shareTextStyle: 'fg-orange75'
    });
  },
  handleLike: function() {
    this.setState({
      likeCount: 1000,
      likeActive: true,
      likeTextStyle: 'fg-orange75'
    });
  },
  render: function() {
    var comments = {};
    this.state.comments.forEach(function(c) {
      var d = moment(c.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
      comments['comment-' + c._id] = <PostComment author={c.author} date={d} >{c.content}</PostComment>;
    });
    var img = <noscript></noscript>;
    if(this.props.img)
      img = <Img responsive src={this.props.img}/>;
    return (
      <PanelContainer noControls>
        <PanelBody style={{padding: 25, paddingTop: 12.5}}>
          <div className='inbox-avatar'>
            <img src={this.props.author.avatar} width='40' height='40' />
            <div className='inbox-avatar-name'>
              <div className='fg-darkgrayishblue75'>{this.props.author.name}</div>
              <div className='fg-text'><small>{this.props.date}</small></div>
            </div>
            <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
              <div style={{position: 'relative', top: 0}}><Icon glyph='icon-fontello-anchor icon-1-and-quarter-x'/></div>
            </div>
          </div>
          <div>
            <div className='fg-text'>
              {this.props.children}..
            </div>
          </div>
          <div style={{margin: -25, marginTop: 25}}>
            {img}
          </div>
        </PanelBody>
        <PanelFooter noRadius className='fg-black75 bg-white' style={{padding: '12.5px 25px', margin: 0}}>
          <Button ref='likeCount' outlined bsStyle='orange75' active={this.state.likeActive} onClick={this.handleLike}>
            <Icon glyph='icon-fontello-heart-1' />
            <span style={{marginLeft:'5px'}}>{this.state.likeCount}</span>
          </Button>
          <Button style={{marginLeft:'5px'}} ref='shareCount' outlined bsStyle='default' active={this.state.shareActive} onClick={this.handleShare}>
            <Icon glyph='icon-stroke-gap-icons-Share' />
            <span style={{marginLeft:'5px'}}>{this.state.shareCount}</span>
          </Button>
        </PanelFooter>
        <PanelFooter style={{padding: 25, paddingTop: 0, paddingBottom: 0}} className="bg-gray">
          {comments}
        </PanelFooter>
        <NewComment></NewComment>
      </PanelContainer>
    );
  }
});

var Body = React.createClass({
  getInitialState: function() {
    return {data: PostStore.getData()};
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
    this.setState({data: PostStore.getData()});
  },
  render: function() {
    var rightStream = {};
    this.state.data.forEach(function (obj) {
      var d = moment(obj.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
      rightStream["post-" + obj._id] =
        <PostSummary author={obj.author} date={d} comments={obj.comments}>
          {obj.content}
        </PostSummary>;
    });
    return (
      <Container id='body' className='social'>
        <Grid>
          <Row>
            <Col sm={6} collapseRight >
              <NewPost></NewPost>
              <PostSummary
                _id='123'
                date='2 hours ago'
                //img='/imgs/gallery/tumblr_n8zm8ndGiY1st5lhmo1_1280.jpg'
                comments={[
                {_id:"33",content:"Nice!",create_at:"2015-11-21 23:21:00"},
                {_id:"34",content:"Nice!",create_at:"2015-11-22 23:21:00"},
                {_id:"35",content:"Nice!",create_at:"2015-11-23 23:21:00"}]}
                >
                  {"I'll be out of my mind and you'll be out of ideas pretty soon."}
              </PostSummary>
            </Col>
            <Col sm={6} >
              {rightStream}
            </Col>
          </Row>
        </Grid>
        {this.props.children}
      </Container>
    );
  }
});

var classSet = React.addons.classSet;
var Posts = React.createClass({
  mixins: [SidebarMixin],
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
