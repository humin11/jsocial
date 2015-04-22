var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var Authentication = require('../../mixins/auth_mixin.jsx');
var classSet = React.addons.classSet;

var NewPost = React.createClass({
  mixins:[Authentication],
  getInitialState: function() {
    return {
      postHolder: '',
      uploadHolder: '',
      disabledOkBtn: true,
      hideUpload: true
    };
  },
  componentDidMount: function() {
    l20n.ctx.localize(['inputNewPost','uploadImage'], function(l) {
      this.setState({
        postHolder: l20n.ctx.getSync('inputNewPost'),
        uploadHolder: l20n.ctx.getSync('uploadImage')
      });
    }.bind(this));
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
    $("#uploadImg").dropzone.removeAllFiles(true);
    this.setState({ hideUpload:true});
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
    return (
      <PanelContainer noControls className="newpost">
        <PanelBody style={{padding: 12.5}} className="newpost-main">
          <div id="postContent" onKeyUp={this._handleChange} contentEditable placeholder={this.state.postHolder} className="newpost-editor"></div>
          <div className={uploadClass} id="uploadImg">
            <div className="dz-default dz-message">
              <span>{this.state.uploadHolder}</span>
            </div>
          </div>
          <div className="hide" id="uploadFileName"></div>
        </PanelBody>
        <PanelFooter className='fg-black75 bg-gray' style={{padding: '12.5px 25px'}}>
          <Grid>
            <Row>
              <Col xs={6} collapseLeft collapseRight>
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
    )
  }
});

module.exports = NewPost;