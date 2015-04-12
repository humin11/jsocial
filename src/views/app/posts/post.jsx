var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var UsersStore = require('../../stores/users_store.jsx');
var PostStore = require('../../stores/posts_store.jsx');
var NewComment = require('./new_comment.jsx');
var Comments = require('./comments.jsx');
var moment = require('moment');
moment.locale('zh-cn');
var classSet = React.addons.classSet;

var Post = React.createClass({
  getInitialState: function () {
    return {
      likeActive: false,
      reshareActive: false,
      reshareTextStyle: 'fg-white',
      post: this.props.post,
      newCommentExpanded: false,
      isLoggedIn: UsersStore.isLoggedIn()
    };
  },
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onLogin);
    PostStore.addPostChangeListener(this._onChange);
    ReactBootstrap.Dispatcher.on('newcomment:expand',this._onNewCommentExpand);
    ReactBootstrap.Dispatcher.on('newcomment:collapse',this._onNewCommentCollapse);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onLogin);
    PostStore.removePostChangeListener(this._onChange);
    ReactBootstrap.Dispatcher.off('newcomment:expand',this._onNewCommentExpand);
    ReactBootstrap.Dispatcher.off('newcomment:collapse',this._onNewCommentCollapse);
  },
  _onLogin: function(){
    this.setState({isLoggedIn: UsersStore.isLoggedIn()});
  },
  _onChange: function(post) {
    if(post._id == this.state.post._id) {
      this.setState({
        post: post,
        newCommentExpanded: false
      });
    }
  },
  _onNewCommentCollapse: function(id) {
    if(id == this.state.post._id) {
      this.setState({
        newCommentExpanded: false
      });
    }
  },
  _onNewCommentExpand: function(id){
    if(id == this.state.post._id) {
      this.setState({
        newCommentExpanded: true
      });
    }
  },
  _handleReshare: function() {
    var post = this.state.post;
    var reshareActive = this.state.reshareActive;
    if(reshareActive) {
      post.reshare_count--;
      reshareActive = false;
    }else{
      post.reshare_count++;
      reshareActive = true;
    }
    this.setState({
      post: post,
      reshareActive: reshareActive
    });
  },
  _handleLike: function() {
    var post = this.state.post;
    var likeActive = this.state.likeActive;
    if(likeActive) {
      post.like_count--;
      likeActive = false;
    }else{
      post.like_count++;
      likeActive = true;
    }
    this.setState({
      post: post,
      likeActive: likeActive
    });
  },
  render: function() {
    var create_at = moment(this.state.post.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
    var holder = l20n.ctx.getSync('inputNewComment',null);
    var img = null;
    if(this.props.img)
      img = <Img responsive src={this.props.img}/>;
    var hideCommentHolder = false;
    if(this.state.post.comment_count > 0)
      hideCommentHolder = true;
    var inputClass = classSet({
      'hide': hideCommentHolder || this.state.newCommentExpanded || !this.state.isLoggedIn
    });
    var commentHolder = null;
    if(this.state.isLoggedIn && !hideCommentHolder && !this.state.newCommentExpanded) {
      commentHolder = <Input type='text' placeholder={holder}
                             onClick={this._onNewCommentExpand.bind(this,this.state.post._id)}
                             style={{border: '1px solid #d8d8d8'}}/>;
    }
    return (
      <PanelContainer noControls>
        <PanelBody style={{padding: 25, paddingTop: 12.5}}>
          <div className='inbox-avatar'>
            <img src={this.state.post.author.avatar} width='40' height='40' style={{borderRadius: '20px'}}/>
            <div className='inbox-avatar-name'>
              <div className='fg-darkgrayishblue75'>{this.state.post.author.name}</div>
              <div className='fg-text'><small>{create_at}</small></div>
            </div>
            <div className='inbox-date hidden-sm hidden-xs fg-text text-right'>
              <div style={{position: 'relative', top: 0}}>
                <Icon className='fg-gray hide' glyph='icon-ikons-arrow-down icon-1-and-quarter-x'/>
              </div>
            </div>
          </div>
          <div>
            <div className='fg-text'>
              {this.state.post.content}
            </div>
          </div>
          <div style={{margin: -25, marginTop: 25}}>
            {img}
          </div>
        </PanelBody>
        <PanelFooter noRadius className='fg-black75 bg-white' style={{padding: '10px 10px', margin: 0}}>
          <Grid style={{marginRight:'-30px'}}>
            <Row>
              <Col xs={2} style={{marginLeft:'-20px'}}>
                <Button xs ref='likeCount' outlined bsStyle='orange65' active={this.state.likeActive} onClick={this._handleLike}>
                  <Icon glyph='icon-fontello-heart-1' />
                  <span style={{marginLeft:'5px'}}>{this.state.post.like_count}</span>
                </Button>
              </Col>
              <Col xs={2} >
                <Button xs style={{marginLeft:'5px'}} ref='reshareCount' outlined bsStyle='default' active={this.state.reshareActive} onClick={this._handleReshare}>
                  <Icon glyph='icon-stroke-gap-icons-Share' />
                  <span style={{marginLeft:'5px'}}>{this.state.post.reshare_count}</span>
                </Button>
              </Col>
              <Col xs={6} style={{margin:'0 0 0 10px'}}>
                {commentHolder}
              </Col>
              <Col xs={2} >
                <img src='/imgs/avatars/avatar1.png' width='25' height='25' />
              </Col>
            </Row>
          </Grid>
        </PanelFooter>
        <Comments post={this.state.post} />
        <NewComment source={{_id: this.state.post._id, type: 'post'}}
                    expanded={this.state.newCommentExpanded}
                    hideHolder={!hideCommentHolder}/>
      </PanelContainer>
    );
  }
});

module.exports = Post;