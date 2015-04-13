var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var classSet = React.addons.classSet;
var Authentication = require('../../mixins/authentication.jsx');

var NewComment = React.createClass({
  mixins:[Authentication],
  getInitialState: function () {
    return {
      disabledOkBtn: true,
      disabledCancelBtn: false
    };
  },
  _onExpand: function(){
    this.refs.commentContent.getDOMNode().innerHTML = '';
    this.setState({
      disabledOkBtn: true,
      disabledCancelBtn: false
    });
    ReactBootstrap.Dispatcher.emit('newcomment:expand',this.props.source._id);
  },
  _handleOk: function(){
    var content = this.refs.commentContent.getDOMNode().innerText;
    this.setState({
      disabledOkBtn: true,
      disabledCancelBtn: true
    });
    AppDispatcher.dispatch({
      type: ActionTypes.COMMENTS_CREATE,
      data: {content:content,source:this.props.source}
    });
  },
  _handleChange: function(){
    if(this.refs.commentContent.getDOMNode().innerText.length > 0){
      this.setState({ disabledOkBtn: false });
    }else{
      this.setState({ disabledOkBtn: true });
    }
  },
  _handleCancel: function(){
    this.refs.commentContent.getDOMNode().innerHTML = '';
    this.setState({
      disabledOkBtn: true,
      disabledCancelBtn: false
    });
    ReactBootstrap.Dispatcher.emit('newcomment:collapse',this.props.source._id);
  },
  render: function () {
    if(!this.state.isLoggedIn)
      return null;
    var holder = l20n.ctx.getSync('inputNewComment');
    var footerClass = classSet({
      'hide': !this.props.expanded && this.props.hideHolder
    });
    var collapsedClass = classSet({
      'hide': this.props.expanded || this.props.hideHolder
    });

    var expandedClass = classSet({
      'hide': !this.props.expanded
    });
    var footerPadding = '15px 25px 15px 25px';
    if(this.props.expanded) {
      footerPadding = '15px 0 15px 0';
    }
    var okBtn = <Button ref='okBtn' bsStyle='success' onClick={this._handleOk}><Entity entity='submitComment'/></Button>;
    if(this.state.disabledOkBtn) {
      okBtn = <Button ref='okBtn' disabled bsStyle='success' onClick={this._handleOk}><Entity entity='submitComment'/></Button>;
    }
    var cancelBtn = <Button ref='cancelBtn' style={{marginLeft:'4px'}} bsStyle='darkgray50' onClick={this._handleCancel}><Entity entity='cancel'/></Button>;
    if(this.state.disabledCancelBtn) {
      cancelBtn = <Button ref='cancelBtn' disabled style={{marginLeft:'4px'}} bsStyle='darkgray50' onClick={this._handleCancel}><Entity entity='cancel'/></Button>;
    }
    return (
      <PanelFooter style={{marginTop:0, padding: footerPadding, borderTop: 0,backgroundColor:'#f5f5f5'}} className={footerClass}>
        <Input className={collapsedClass} type='text' placeholder={holder}  onClick={this._onExpand}
               style={{border: '1px solid #d8d8d8'}}/>
        <Grid className={expandedClass}>
          <Row>
            <Col xs={2}>
              <img src={this.state.user.avatar} width='30' height='30'
                   style={{verticalAlign:'top',top:10,position:'relative'}}/>
            </Col>
            <Col xs={9} className="comment-editor-main bg-white">
              <div ref="commentContent" onKeyUp={this._handleChange} contentEditable placeholder={holder} className="comment-editor"></div>
            </Col>
          </Row>
          <div className='text-right' style={{paddingRight:'10px'}} >
            {okBtn}
            {cancelBtn}
          </div>
        </Grid>
      </PanelFooter>
    )
  }
});

module.exports = NewComment;