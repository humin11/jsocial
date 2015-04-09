var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var moment = require('moment');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var PostStore = require('../stores/posts_store.jsx');
var UsersStore = require('../stores/users_store.jsx');
var Authentication = require('../mixins/authentication.jsx');

var NewPost = React.createClass({
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  },
  handleClick: function(){
    var content = this.refs.postContent.getDOMNode().value;
    AppDispatcher.dispatch({
      type: ActionTypes.POSTS_CREATE,
      content:content
    });
  },
  render: function () {
    //if(!UsersStore.isLoggedIn())
    //  return <noscript></noscript>;
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
  getDefaultProps: function() {
    return {
      author:{
        name: "admin",
        avatar: "/imgs/avatars/avatar.jpg"
      }
    };
  },
  getInitialState: function () {
    return {
      collapsed: true,
      disabledOkBtn: true
    };
  },
  _onClick: function(){
    this.setState({collapsed:false});
  },
  _handleOk: function(){
    var content = this.refs.commentContent.getDOMNode().innerText;
    AppDispatcher.dispatch({
      type: ActionTypes.COMMENTS_CREATE,
      data: {content:content,source_id:this.props.source_id,source_type:'post'}
    });
    this.setState({collapsed:true,disabledOkBtn: true});
  },
  _handleChange: function(){
    if(this.refs.commentContent.getDOMNode().innerText.length > 0){
      this.setState({disabledOkBtn:false});
    }else{
      this.setState({disabledOkBtn:true});
    }
  },
  _handleCancel: function(){
    this.setState({collapsed:true});
  },
  render: function () {
    //if(!UsersStore.isLoggedIn())
    //  return <noscript></noscript>;
    var item;
    var footerPadding = '15px 25px 15px 25px';

    if(this.state.collapsed) {
      item = <Input type='text' placeholder='Write a comment...' onClick={this._onClick}
                    style={{border: '1px solid #d8d8d8'}}/>;
    }else {
      var okBtn = <Button ref='okBtn' bsStyle='success' onClick={this._handleOk}>Ok</Button>;
      if(this.state.disabledOkBtn)
        okBtn = <Button ref='okBtn' disabled bsStyle='success' onClick={this._handleOk}>Ok</Button>;
      item =
        <Grid>
          <Row>
            <Col xs={2}>
              <img src={this.props.author.avatar} width='30' height='30'
                   style={{verticalAlign:'top',top:10,position:'relative',borderRadius:'20px'}}/>
            </Col>
            <Col xs={9} className="comment-editor-main bg-white">
              <div ref="commentContent" onKeyUp={this._handleChange} contentEditable placeholder='Write a comment...' className="comment-editor"></div>
            </Col>
          </Row>
          <div className='text-right' style={{paddingRight:'10px'}} >
            {okBtn}
            <Button ref='cancelBtn'  style={{marginLeft:'4px'}} bsStyle='default' onClick={this._handleCancel}>Cancel</Button>
          </div>
        </Grid>;
      footerPadding = '15px 0 15px 0';
    }
    return (
      <PanelFooter style={{marginTop:0, padding: footerPadding, borderTop: 0}} className="bg-gray">
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
        avatar: "/imgs/avatars/avatar.jpg"
      }
    };
  },
  render: function () {
    return (
      <div className='inbox-avatar' style={{borderBottom: '1px solid #EAEDF1'}}>
        <img src={this.props.author.avatar} width='30' height='30' style={{verticalAlign:'top',top:10,position:'relative',borderRadius:'20px'}} />
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

var MoreComments = React.createClass({
  getDefaultProps: function() {
    return {
      counts:0
    };
  },
  getInitialState: function () {
    return {
      collapsed: true
    };
  },
  render: function(){
    return (
      <span></span>
    );
  }
});

var PostSummary = React.createClass({
  getDefaultProps: function() {
    return {
      author: {
        name: "admin",
        avatar: "/imgs/avatars/avatar.jpg"
      }
    };
  },
  getInitialState: function () {
    return {
      likeCount:123,
      likeActive: false,
      reshareCount:231,
      reshareActive: false,
      reshareTextStyle: 'fg-white',
      commentCount:321,
      comments: this.props.comments
    };
  },
  _handleReshare: function() {
    this.setState({
      reshareCount: 1000,
      reshareActive: true,
      reshareTextStyle: 'fg-orange75'
    });
  },
  _handleLike: function() {
    var likeCount = this.state.likeCount;
    var likeActive = this.state.likeActive;
    if(likeCount == 1000) {
      likeCount = 999;
      likeActive = false;
    }else{
      likeCount = 1000;
      likeActive = true;
    }
    this.setState({
      likeCount: likeCount,
      likeActive: likeActive
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
            <img src={this.props.author.avatar} width='40' height='40' style={{borderRadius: '20px'}}/>
            <div className='inbox-avatar-name'>
              <div className='fg-darkgrayishblue75'>{this.props.author.name}</div>
              <div className='fg-text'><small>{this.props.date}</small></div>
            </div>
            <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
              <div style={{position: 'relative', top: 0}}><Icon className='fg-gray' glyph='icon-ikons-arrow-down icon-1-and-quarter-x'/></div>
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
        <PanelFooter noRadius className='fg-black75 bg-white' style={{padding: '10px 10px', margin: 0}}>
          <div className='fg-pink' style={{display: 'inline-block', marginLeft: 25}}>
            <Icon className="fg-gray" glyph='icon-ikons-heart' active={this.state.likeActive} onClick={this._handleLike}/>
            <span>{this.state.likeCount}</span>
          </div>
          <div style={{display: 'inline-block', marginLeft: 25}}>
            <Icon className="fg-gray" glyph='icon-fontello-share' active={this.state.reshareActive} onClick={this._handleReshare}/>
            <span>{this.state.reshareCount}</span>
          </div>
        </PanelFooter>
        <PanelFooter style={{padding: 25, paddingTop: 0, paddingBottom: 0}} className="bg-gray">
          {comments}
        </PanelFooter>
        <NewComment source_id={this.props.id}></NewComment>
      </PanelContainer>
    );
  }
});

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
    var rightStream = {};
    this.state.data.forEach(function (obj) {
      var d = moment(obj.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
      rightStream["post-" + obj._id] =
        <PostSummary id={obj._id} author={obj.author} date={d} comments={obj.comments}>
          {obj.content}
        </PostSummary>;
    });
    return (
      <Container id='body' className='social'>
        <Grid>
          <Row><Col sm={4} collapseRight ></Col></Row>
          <Row>
            <Col sm={4} collapseRight >
              <NewPost></NewPost>
              <PostSummary
                id='123'
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
            <Col sm={4} collapseRight>
              <PostSummary
                id='121'
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
            <Col sm={4} collapseRight>
              <PostSummary
                id='321'
                date='2 hours ago'
                //img='/imgs/gallery/tumblr_n8zm8ndGiY1st5lhmo1_1280.jpg'
                comments={[
                {_id:"33",content:"Nice!",create_at:"2015-11-21 23:21:00"},
                {_id:"34",content:"Nice!",create_at:"2015-11-22 23:21:00"},
                {_id:"35",content:"Nice!",create_at:"2015-11-23 23:21:00"}]}
                >
                {"I'll be out of my mind and you'll be out of ideas pretty soon."}
              </PostSummary>
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
