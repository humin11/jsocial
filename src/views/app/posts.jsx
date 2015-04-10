var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var Recommend = require('../common/recommend_people.jsx');
var moment = require('moment');
moment.locale('zh-cn');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var PostStore = require('../stores/posts_store.jsx');
var UsersStore = require('../stores/users_store.jsx');
var Authentication = require('../mixins/authentication.jsx');

var NewPost = React.createClass({
  getInitialState: function () {
    return {
      isLoggedIn: UsersStore.isLoggedIn()
    };
  },
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onChange);
  },
  _handleClick: function(){
    var content = this.refs.postContent.getDOMNode().value;
    AppDispatcher.dispatch({
      type: ActionTypes.POSTS_CREATE,
      content:content
    });
  },
  _onChange: function(){
    this.setState({isLoggedIn: UsersStore.isLoggedIn()});
  },
  render: function () {
    if(!this.state.isLoggedIn)
      return <noscript></noscript>;
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
                <Button onClick={this._handleClick} bsStyle='darkgreen45'><Entity entity='share'/></Button>
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
      collapsed: true,
      disabledOkBtn: true,
      author: UsersStore.getUser(),
      isLoggedIn: UsersStore.isLoggedIn()
    };
  },
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      author: UsersStore.getUser(),
      isLoggedIn: UsersStore.isLoggedIn()
    });
  },
  _handleClick: function(){
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
    if(!this.state.isLoggedIn)
      return <noscript></noscript>;
    var item;
    var footerPadding = '15px 25px 15px 25px';

    if(this.state.collapsed) {
      item = <Input type='text' placeholder='Write a comment...' onClick={this._handleClick}
                    style={{border: '1px solid #d8d8d8'}}/>;
    }else {
      var okBtn = <Button ref='okBtn' bsStyle='success' onClick={this._handleOk}>Ok</Button>;
      if(this.state.disabledOkBtn) {
        okBtn = <Button ref='okBtn' disabled bsStyle='success' onClick={this._handleOk}>Ok</Button>;
      }
      item =
        <Grid>
          <Row>
            <Col xs={2}>
              <img src={this.state.author.avatar} width='30' height='30'
                   style={{verticalAlign:'top',top:10,position:'relative'}}/>
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
        avatar: "/imgs/avatars/avatar4.png"
      }
    };
  },
  render: function () {
    return (
      <div className='inbox-avatar' style={{borderBottom: '1px solid #EAEDF1'}}>
        <img src={this.props.author.avatar} width='30' height='30' style={{verticalAlign:'top',top:10,position:'relative'}} />
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
        avatar: "/imgs/avatars/avatar4.png"
      }
    };
  },
  getInitialState: function () {
    return {
      likeCount:this.props.likeCount,
      likeActive: false,
      reshareCount:this.props.reshareCount,
      reshareActive: false,
      reshareTextStyle: 'fg-white',
      commentCount:this.props.commentCount,
      comments: this.props.comments
    };
  },
  _handleReshare: function() {
    var reshareCount = this.state.reshareCount;
    var reshareActive = this.state.reshareActive;
    if(reshareActive) {
      reshareCount--;
      reshareActive = false;
    }else{
      reshareCount++;
      reshareActive = true;
    }
    this.setState({
      reshareCount: reshareCount,
      reshareActive: reshareActive
    });
  },
  _handleLike: function() {
    var likeCount = this.state.likeCount;
    var likeActive = this.state.likeActive;
    if(likeActive) {
      likeCount--;
      likeActive = false;
    }else{
      likeCount++;
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
      <PanelContainer noControls className="item">
        <PanelBody style={{padding: 25, paddingTop: 12.5}}>
          <div className='inbox-avatar'>
            <img src={this.props.author.avatar} width='40' height='40' style={{borderRadius: '20px'}}/>
            <div className='inbox-avatar-name'>
              <div className='fg-darkgrayishblue75'>{this.props.author.name}</div>
              <div className='fg-text'><small>{this.props.date}</small></div>
            </div>
            <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
              <div style={{position: 'relative', top: 0}}>
                <Icon className='fg-gray hide' glyph='icon-ikons-arrow-down icon-1-and-quarter-x'/>
              </div>
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
          <Button xs ref='likeCount' outlined bsStyle='orange65' active={this.state.likeActive} onClick={this._handleLike}>
            <Icon glyph='icon-fontello-heart-1' />
            <span style={{marginLeft:'5px'}}>{this.state.likeCount}</span>
          </Button>
          <Button xs style={{marginLeft:'5px'}} ref='reshareCount' outlined bsStyle='default' active={this.state.reshareActive} onClick={this._handleReshare}>
            <Icon glyph='icon-stroke-gap-icons-Share' />
            <span style={{marginLeft:'5px'}}>{this.state.reshareCount}</span>
          </Button>
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
    var leftStream = {};
    var centerStream = {};
    var rightStream = {};
    for(var i=0;i<this.state.data.length;i++){
      var obj = this.state.data[i];
      var d = moment(obj.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
      if((i+1) % 3 == 0){
        rightStream["post-" + obj._id] =
          <PostSummary id={obj._id} author={obj.author} date={d}  comments={obj.comments}
                       likeCount={obj.like_count} reshareCount={obj.reshare_count} commentCount={obj.comment_count}>
            {obj.content}
          </PostSummary>;
      }else if((i+1) % 2 == 0) {
        leftStream["post-" + obj._id] =
          <PostSummary id={obj._id} author={obj.author} date={d} comments={obj.comments}
                       likeCount={obj.like_count} reshareCount={obj.reshare_count} commentCount={obj.comment_count}>
            {obj.content}
          </PostSummary>;
      }else{
        centerStream["post-" + obj._id] =
          <PostSummary id={obj._id} author={obj.author} date={d} comments={obj.comments}
                       likeCount={obj.like_count} reshareCount={obj.reshare_count} commentCount={obj.comment_count}>
            {obj.content}
          </PostSummary>;
      }
    }
    return (
      <Container id='body' className='social'>
        <Grid>
          <Row><Col sm={4} collapseRight ></Col></Row>
          <Row>
            <Col sm={4} collapseRight ref="leftStream">
              <NewPost></NewPost>
              {leftStream}
            </Col>
            <Col sm={4} collapseRight ref="centerStream">
              {centerStream}
            </Col>
            <Col sm={4} collapseRight ref="rightStream">
              <Recommend className="item" ></Recommend>
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
