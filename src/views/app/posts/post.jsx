var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var NewComment = require('./new_comment.jsx');
var Comments = require('./comments.jsx');
var CollapsibleContent = require('./collapsible_content.jsx');
var Authentication = require('../../mixins/auth_mixin.jsx');
var moment = require('moment');
moment.locale('zh-cn');
var classSet = React.addons.classSet;

var Post = React.createClass({
  mixins:[Authentication],
  getInitialState: function () {
    return {
      likeActive: false,
      reshareActive: false,
      reshareTextStyle: 'fg-white',
      post: this.props.post,
      newCommentExpanded: false,
      expandedMoreComment: false,
      toBeDelete: false,
      removeHolderHeight: 0,
      entity: ''
    };
  },
  componentDidMount: function() {
    ReactBootstrap.Dispatcher.on('newcomment:expand',this._onNewCommentExpand);
    ReactBootstrap.Dispatcher.on('newcomment:collapse',this._onNewCommentCollapse);
    ReactBootstrap.Dispatcher.on('morecomments:collapse',this._onMoreCommentsCollapse);
    l20n.ctx.localize(['inputNewComment'], function(l) {
      this.setState({
        entity: l20n.ctx.getSync('inputNewComment')
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    ReactBootstrap.Dispatcher.off('newcomment:expand',this._onNewCommentExpand);
    ReactBootstrap.Dispatcher.off('newcomment:collapse',this._onNewCommentCollapse);
    ReactBootstrap.Dispatcher.off('morecomments:collapse',this._onMoreCommentsCollapse);
  },
  _onChange: function(post) {
    if(post._id == this.state.post._id) {
      this.setState({
        post: post,
        newCommentExpanded: false
      });
    }
  },
  _afterRemove: function(id,height) {
    if(id == this.state.post._id) {
      this.setState({
        toBeDelete: true,
        removeHolderHeight: height
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
  _onNewCommentExpand: function(id) {
    if(id == this.state.post._id) {
      this.setState({
        newCommentExpanded: true
      });
    }
    ReactBootstrap.Dispatcher.emit('newcomment:reset',this.state.post._id);
  },
  _onCommentRemove: function(post) {
    if(post._id == this.state.post._id) {
      this.setState({
        post: post
      });
    }
  },
  _onMoreCommentsExpand: function(post) {
    if(post._id == this.state.post._id) {
      this.setState({
        post: post,
        expandedMoreComment: true
      });
    }
  },
  _onMoreCommentsCollapse: function(id){
    if(id == this.state.post._id) {
      this.props.models.posts.clearMoreComments(id);
      this.setState({
        expandedMoreComment: false
      });
    }
  },
  _handleReshare: function() {
    var post = this.state.post;
    var reshareActive = this.state.reshareActive;
    if(reshareActive) {
      post.reshare_count--;
      reshareActive = false;
    } else {
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
  _handleMenu: function(){
    this.refs.postmenu.show();
  },
  _onPostMenuClick: function(props){
    if(props.action == "delete"){
      AppDispatcher.dispatch({
        type: ActionTypes.POSTS_DELETE,
        id:this.state.post._id,
        height: $(this.refs.post.getDOMNode()).height()
      });
    }
  },
  _handleRefresh: function(){
    this.props.stores.PostsStore.emitChange();
  },
  render: function() {
    var create_at = moment(this.state.post.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
    var img = null;
    if(this.props.img)
      img = <Img responsive src={this.props.img}/>;
    var hideCommentHolder = false;
    if(this.state.post.comment_count > 0)
      hideCommentHolder = true;
    var holderClass = classSet({
      'hide': !(this.state.isLoggedIn && !hideCommentHolder && !this.state.newCommentExpanded),
      'newcomment-holder':true
    });
    var deleteClass = classSet({
      'hide': !this.state.toBeDelete,
      'text-center':true,
      'vertical-center':true
    });
    var postClass = classSet({
      'hide': this.state.toBeDelete
    });
    return (
      <PanelContainer noControls className="post">
        <div ref="post-delete" className={deleteClass} style={{height:this.state.removeHolderHeight}}>
          <div style={{height:this.state.removeHolderHeight/2-100}}></div>
          <div>
            <Icon glyph="icon-fontello-ok" style={{fontSize: 60}}  className="fg-red"/>
          </div>
          <div style={{fontSize:'20px'}}>
            <Entity entity='hadDelete' />
          </div>
          <div className="content-toolbar" style={{fontSize:'14px',color: '#427fed'}} onClick={this._handleRefresh}>
            <Entity entity='close' />
          </div>
        </div>
        <div ref="post" className={postClass}>
          <PanelBody style={{ padding:'12.5px 25px 25px 25px'}} className="post-body">
            <div className='inbox-avatar'>
              <img src={this.state.post.author.avatar} width='40' height='40' style={{borderRadius: '20px'}}/>
              <div className='inbox-avatar-name'>
                <div className='fg-darkgrayishblue75'>{this.state.post.author.name}</div>
                <div className='fg-text'><small>{create_at}</small></div>
              </div>
              <div className='post-toolbar hidden-sm hidden-xs fg-text text-right'>
                <div style={{position: 'relative', top: 0}} className="dropdown">
                  <Icon ref="toolbtn" glyph='icon-ikons-arrow-down' onClick={this._handleMenu} />
                  <Menu alignRight ref='postmenu' className='post-menu' alwaysInactive onItemSelect={this._onPostMenuClick}>
                    <MenuItem href='#' action="delete">
                      <Entity entity='deletePost' />
                    </MenuItem>
                    <MenuItem href='#' action="modify">
                      <Entity entity='modifyPost' />
                    </MenuItem>
                    <MenuItem href='#' action="hide">
                      <Entity entity='hidePost' />
                    </MenuItem>
                    <MenuItem href='#' action="deny_comment">
                      <Entity entity='denyComment' />
                    </MenuItem>
                    <MenuItem href='#' action="deny_reshare">
                      <Entity entity='denyReshare' />
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            <CollapsibleContent className="post-content" content={this.state.post.content} maxHeight={"108px"}/>
            <div style={{margin: -25, marginTop: 25}}>
              {img}
            </div>
          </PanelBody>
          <PanelFooter noRadius className='fg-black75 bg-white' style={{padding: '10px 10px', margin: 0}}>
            <Grid style={{paddingLeft:'0',paddingRight:'0'}}>
              <Row style={{marginLeft:'0',marginRight:'5px'}}>
                <Col xs={2} style={{paddingLeft:'0',paddingRight:'0'}}>
                  <Button style={{borderWidth:'1px'}} xs ref='likeCount' outlined bsStyle='orange65' active={this.state.likeActive} onClick={this._handleLike}>
                    <Icon glyph='icon-fontello-thumbs-up-1' />
                    <span style={{marginLeft:'5px'}}>{this.state.post.like_count}</span>
                  </Button>
                </Col>
                <Col xs={2} style={{paddingLeft:'15px',paddingRight:'0'}}>
                  <Button xs style={{borderWidth:'1px'}} ref='reshareCount' outlined bsStyle='default' active={this.state.reshareActive} onClick={this._handleReshare}>
                    <Icon glyph='icon-fontello-share' />
                    <span style={{marginLeft:'5px'}}>{this.state.post.reshare_count}</span>
                  </Button>
                </Col>
                <Col xs={6} style={{paddingLeft:'35px',paddingRight:'0'}}>
                  <Input className={holderClass} type='text' placeholder={this.state.entity}
                         onClick={this._onNewCommentExpand.bind(this,this.state.post._id)}
                         style={{border: '1px solid #d8d8d8'}} />
                </Col>
                <Col xs={2} hidden-xs hidden-sm style={{paddingLeft:'35px',paddingRight:'0'}}>
                  <img src='/imgs/avatars/avatar1.png' width='25' height='25' />
                </Col>
              </Row>
            </Grid>
          </PanelFooter>
          <Comments models={this.props.models} stores={this.state.stores} post={this.state.post} expanded={this.state.expandedMoreComment} />
          <NewComment models={this.props.models} stores={this.state.stores} source={{_id: this.state.post._id, type: 'post'}}
                      expanded={this.state.newCommentExpanded}
                      hideHolder={!hideCommentHolder} />
        </div>
      </PanelContainer>
    );
  }
});

module.exports = Post;