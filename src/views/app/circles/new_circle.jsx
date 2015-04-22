var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var Authentication = require('../../mixins/auth_mixin.jsx');
var classSet = React.addons.classSet;

var NewCircle = React.createClass({
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
      $("#circleDescription").perfectScrollbar({
        suppressScrollX: true
      });
    }
    $("#uploadImg").dropzone({
      paramName: "file",
      url: '/upload',
      addRemoveLinks: false,
      uploadMultiple: false,
      maxFiles:1,
      init: function() {
        this.on("removedfile", function(file) {

        });
        this.on("success",function(file,obj,e){
          alert(obj.name);
        });
      }
    });
  },
  componentWillUnmount: function() {
    $(this.refs.circleDescription.getDOMNode()).perfectScrollbar('destroy');
  },
  _handleChange: function(){
    console.log(this.refs);
    if(this.refs.circleDescription.getDOMNode().innerText.length > 0){
      this.setState({ disabledOkBtn: false });
    }else{
      this.setState({ disabledOkBtn: true });
    }
  },
  _handleClick: function(){
    var name = this.refs.circleName.getDOMNode().value;
    var description = this.refs.circleDescription.getDOMNode().innerText;

    AppDispatcher.dispatch({
      type: ActionTypes.CIRCLE_CREATE,
      data: {name: name, description: description}
    });
    console.log(name);
    console.log(description);

    this.refs.circleName.getDOMNode().value = '';
    this.refs.circleDescription.getDOMNode().innerHTML = '';
  },
  _onClickUpload: function(){
    this.setState({ hideUpload: !this.state.hideUpload });
  },
  render: function () {
    if(!this.state.isLoggedIn)
      return null;

    var collapsedClass = classSet({
      'hide': this.props.expanded || this.props.hideHolder,
      'newcomment-holder': true
    });

    var btn = <Button onClick={this._handleClick} bsStyle='darkgreen45'><Entity entity='circleCreate'/></Button>;
    if(this.state.disabledOkBtn) {
      btn = <Button disabled onClick={this._handleClick} bsStyle='darkgreen45'><Entity entity='circleCreate'/></Button>;
    }
    var uploadClass = classSet({
      'hide': this.state.hideUpload,
      'dropzone': true
    });
    return (
      <PanelContainer noControls className="newpost">
        <PanelBody style={{padding: 12.5}}>
          <Entity entity='circleName'/>
          <Input id="circleName" className={collapsedClass} type='text' placeholder={this.state.entity}
                 style={{border: '1px solid #d8d8d8'}}/>
          <Entity entity='circleDescription'/>
          <div id="circleDescription" onKeyUp={this._handleChange} contentEditable placeholder={this.state.postHolder} className="newpost-editor"></div>
          <div className={uploadClass} id="uploadImg">
            <div className="dz-default dz-message">
              <span>{this.state.uploadHolder}</span>
            </div>
          </div>
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

module.exports = NewCircle;