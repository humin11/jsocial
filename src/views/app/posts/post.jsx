var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var NewComment = require('./new_comment.jsx');
var Comments = require('./comments.jsx');
var CollapsibleContent = require('./collapsible_content.jsx');
var Authentication = require('../../mixins/auth_mixin.jsx');
var ConfirmDialog = require('../../common/confirm_dialog.jsx');
var PostAction = require('../../actions/post_action.jsx');
var moment = require('moment');
moment.locale('zh-cn');
var classSet = React.addons.classSet;

var Post = React.createClass({
  mixins:[Authentication],
  propTypes: {
    post: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      likeActive: false,
      reshareActive: false,
      reshareTextStyle: 'fg-white',
      newCommentExpanded: false,
      expandedMoreComment: false,
      entity: ''
    };
  },
  componentDidMount: function() {
    ReactBootstrap.Dispatcher.on('newcomment:expand',this._onNewCommentExpand);
    ReactBootstrap.Dispatcher.on('newcomment:collapse',this._onNewCommentCollapse);
    l20n.ctx.localize(['inputNewComment'], function(l) {
      this.setState({
        entity: l20n.ctx.getSync('inputNewComment')
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    ReactBootstrap.Dispatcher.off('newcomment:expand',this._onNewCommentExpand);
    ReactBootstrap.Dispatcher.off('newcomment:collapse',this._onNewCommentCollapse);
  },
  _onNewCommentCollapse: function(id) {
    if(id == this.props.post._id) {
      this.setState({
        newCommentExpanded: false
      });
    }
  },
  _onNewCommentExpand: function(id) {
    if(id == this.props.post._id) {
      this.setState({
        newCommentExpanded: true
      });
    }
    ReactBootstrap.Dispatcher.emit('newcomment:reset',this.props.post._id);
  },
  _handleReshare: function() {
    var reshareActive = this.state.reshareActive;
    if(reshareActive) {
      reshareActive = false;
    } else {
      reshareActive = true;
    }
    this.setState({
      reshareActive: reshareActive
    });
  },
  _handleLike: function() {
    var likeActive = this.state.likeActive;
    if(likeActive) {
      likeActive = false;
    }else{
      likeActive = true;
    }
    this.setState({
      likeActive: likeActive
    });
  },
  _handleMenu: function(){
    this.refs.postmenu.show();

  },
  _onPostMenuClick: function(props){
    if(props.action == "delete"){
      var data = {_id:this.props.post._id};
      var height = $(this.refs.post.getDOMNode()).height();
      var vexContent;
      vex.dialog.open({
        afterOpen: function($vexContent) {
          vexContent = $vexContent;
          return React.render(<ConfirmDialog id={$vexContent.data().vex.id} handler={PostAction.delete.bind(this,data,height)}/>, $vexContent.get(0));
        },
        afterClose: function() {
          React.unmountComponentAtNode(vexContent);
        }
      });
    }
  },
  _handleRefresh: function(){
    this.props.models.posts.removePost(this.props.post._id);
    this.props.stores.PostsStore.emitChange();
  },
  render: function() {
    var create_at = moment(this.props.post.create_at, "YYYY-MM-DD HH:mm:ss").fromNow();
    var img = null;
    if(this.props.post.img)
      img = <Img responsive src={this.props.post.img} style={{maxHeight:'350px',maxWidth:'350px'}}/>;
    var hideCommentHolder = false;
    if(this.props.post.comment_count > 0)
      hideCommentHolder = true;
    var holderClass = classSet({
      'hide': !(this.state.isLoggedIn && !hideCommentHolder && !this.state.newCommentExpanded),
      'newcomment-holder':true
    });
    var toBeDelete = false;
    if(this.props.post.toBeDelete)
      toBeDelete = true;
    var deleteClass = classSet({
      'hide': !toBeDelete,
      'text-center':true,
      'vertical-center':true
    });
    var postClass = classSet({
      'hide': toBeDelete
    });
    var removeHolderHeight = 0;
    if(this.props.post.toBeDelete)
      removeHolderHeight = this.props.post.height;
    return (
      <PanelContainer noControls className="post">
        <div ref="post-delete" className={deleteClass} style={{height:removeHolderHeight}}>
          <div style={{height:removeHolderHeight/2-100}}></div>
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
              <img src={this.props.post.author.avatar} width='40' height='40' style={{borderRadius: '20px'}}/>
              <div className='inbox-avatar-name'>
                <div className='fg-darkgrayishblue75'>{this.props.post.author.name}</div>
                <div className='fg-text' style={{marginTop:'8px'}}><small>{create_at}</small></div>
              </div>
              <div className='post-toolbar hidden-sm hidden-xs fg-text text-right'>
                <div style={{position: 'relative', top: 0}}>
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
            <CollapsibleContent className="post-content" content={this.props.post.content} maxHeight={"108px"}/>
            <div style={{margin: "25px -15px -25px -15px"}} className="text-center">
              {img}
            </div>
          </PanelBody>
          <PanelFooter noRadius className='fg-black75 bg-white' style={{padding: '10px 10px', margin: 0, borderTop:0}}>
            <Grid style={{paddingLeft:'0',paddingRight:'0'}}>
              <Row style={{marginLeft:'0',marginRight:'5px'}}>
                <Col xs={2} style={{paddingLeft:'0',paddingRight:'0'}}>
                  <Button style={{borderWidth:'1px'}} xs ref='likeCount' outlined bsStyle='orange65' active={this.state.likeActive} onClick={this._handleLike}>
                    <Icon glyph='icon-fontello-thumbs-up-1' />
                    <span style={{marginLeft:'5px'}}>{this.props.post.like_count}</span>
                  </Button>
                </Col>
                <Col xs={2} style={{paddingLeft:'15px',paddingRight:'0'}}>
                  <Button xs style={{borderWidth:'1px'}} ref='reshareCount' outlined bsStyle='default' active={this.state.reshareActive} onClick={this._handleReshare}>
                    <Icon glyph='icon-fontello-share' />
                    <span style={{marginLeft:'5px'}}>{this.props.post.reshare_count}</span>
                  </Button>
                </Col>
                <Col xs={6} style={{paddingLeft:'35px',paddingRight:'0'}}>
                  <Input className={holderClass} type='text' placeholder={this.state.entity}
                         onClick={this._onNewCommentExpand.bind(this,this.props.post._id)}
                         style={{border: '1px solid #d8d8d8'}} />
                </Col>
                <Col xs={2} hidden-xs hidden-sm style={{paddingLeft:'35px',paddingRight:'0'}}>
                  <img src='/imgs/avatars/avatar1.png' width='25' height='25' />
                </Col>
              </Row>
            </Grid>
          </PanelFooter>
          <Comments models={this.props.models} stores={this.state.stores} post={this.props.post} />
          <NewComment models={this.props.models} stores={this.state.stores} source={{_id: this.props.post._id, type: 'post'}}
                      expanded={this.state.newCommentExpanded}
                      hideHolder={!hideCommentHolder} />
        </div>
      </PanelContainer>
    );
  }
});

module.exports = Post;