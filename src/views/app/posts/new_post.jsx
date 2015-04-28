var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var AuthMixin = require('../../mixins/auth_mixin.jsx');
var classSet = React.addons.classSet;

var NewPostTouchDialog = React.createClass({
  render: function() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} className='text-left bg-white' >
              <div className='fg-black' style={{fontSize: 24, lineHeight: 1, padding: '25px 10px'}}>

              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
});

var NewPostTouch = React.createClass({
  _handleClick: function(){
    var vexContent;
    vex.dialog.open({
      overlayClosesOnClick:false,
      afterOpen: function($vexContent) {
        vexContent = $vexContent;
        $(vexContent).parent().css('margin-top',0);
        $(vexContent).parent().css('margin-bottom',0);
        $(vexContent).height("100%");
        $(vexContent).width("100%");
        return React.render(<NewPostTouchDialog id={$vexContent.data().vex.id} />, $vexContent.get(0));
      },
      afterClose: function() {
        React.unmountComponentAtNode(vexContent);
      }
    });
  },
  render: function(){
    return (
      <div className="newpost-touch visible-xs-inline-block">
        <Button bsStyle='danger' onClick={this._handleClick} >
          <Icon glyph="icon-fontello-pencil-1" style={{fontSize:25}}/>
        </Button>
      </div>
    );
  }
});

var NewPost = React.createClass({
  mixins:[AuthMixin],
  getInitialState: function() {
    return {
      disabledOkBtn: true,
      hideUpload: true
    };
  },
  componentDidMount: function() {
    if(!Modernizr.touch) {
      $("#postContent").perfectScrollbar({
        suppressScrollX: true
      });
    }
    $("#uploadImg").dropzone({
      paramName: "file",
      url: '/upload',
      addRemoveLinks: true,
      uploadMultiple: false,
      maxFiles:1,
      init: function() {
        this.on("removedfile", function(file) {
          this.enable();
        });
        this.on("success",function(file,obj,e){
          this.disable();
          $('#uploadFileName')[0].innerText=obj;
        });
      }
    });
  },
  componentWillUnmount: function() {
    $("#postContent").perfectScrollbar('destroy');
  },
  _handleChange: function(){
    if($("#postContent")[0].innerText.length > 0){
      this.setState({ disabledOkBtn: false });
    }else{
      this.setState({ disabledOkBtn: true });
    }
  },
  _handleClick: function(){
    var content = $("#postContent")[0].innerText;
    var img = $("#uploadFileName")[0].innerText;
    AppDispatcher.dispatch({
      type: ActionTypes.POSTS_CREATE,
      data: {content:content,img:img}
    });
    $('#postContent')[0].innerHTML = '';
    $("#uploadImg")[0].dropzone.removeAllFiles(true);
    this.setState({ hideUpload:true,disabledOkBtn: true});
  },
  _onClickUpload: function(){
    this.setState({ hideUpload: !this.state.hideUpload });
  },
  render: function () {
    if(!this.state.isLoggedIn)
      return null;

    var btn = <Button onClick={this._handleClick} bsStyle='darkgreen45'><Entity entity='share'/></Button>;
    if(this.state.disabledOkBtn) {
      btn = <Button disabled onClick={this._handleClick} bsStyle='darkgreen45'><Entity entity='share'/></Button>;
    }
    var uploadClass = classSet({
      'hide': this.state.hideUpload,
      'dropzone': true,
      'text-center':true
    });
    var contentHolder = classSet({
      'hide': !this.state.disabledOkBtn,
      'content-holder': true
    });
    var postHolder = l20n.ctx.getSync('inputNewPost');
    var uploadHolder= l20n.ctx.getSync('uploadImage');
    return (
      <div>
        <PanelContainer noControls className="newpost hidden-xs">
          <PanelBody style={{padding: 12.5}} className="newpost-main">
            <div className={contentHolder} >{postHolder}</div>
            <div id="postContent" onKeyUp={this._handleChange} contentEditable className="newpost-editor"></div>
            <div className={uploadClass} id="uploadImg">
              <div className="dz-default dz-message">
                <span>{uploadHolder}</span>
              </div>
            </div>
            <div className="hide" id="uploadFileName"></div>
          </PanelBody>
          <PanelFooter className='fg-black75 bg-gray' style={{padding: '12.5px 25px'}}>
            <Grid>
              <Row>
                <Col xs={6} collapseLeft >
                  <a href='#' onClick={this._onClickUpload} style={{border: 'none'}}><Icon glyph='icon-dripicons-camera icon-1-and-quarter-x fg-text' style={{marginRight: 25}} /></a>
                  <a href='#' style={{border: 'none'}}><Icon glyph='icon-dripicons-calendar icon-1-and-quarter-x fg-text' style={{marginRight: 25}} /></a>
                </Col>
                <Col xs={6} className='text-right' collapseLeft collapseRight>
                  {btn}
                </Col>
              </Row>
            </Grid>
          </PanelFooter>
        </PanelContainer>
        <NewPostTouch />
      </div>
    )
  }
});

module.exports = NewPost;