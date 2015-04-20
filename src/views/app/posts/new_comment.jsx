var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var classSet = React.addons.classSet;
var Authentication = require('../../mixins/auth_mixin.jsx');

var NewComment = React.createClass({
  mixins:[Authentication],
  getInitialState: function () {
    return {
      disabledOkBtn: true,
      disabledCancelBtn: false,
      entity: ''
    };
  },
  componentDidMount: function() {
    ReactBootstrap.Dispatcher.on('newcomment:reset',this._onReset);
    l20n.ctx.localize(['inputNewComment'], function(l) {
      this.setState({
        entity: l20n.ctx.getSync('inputNewComment')
      });
    }.bind(this));
  },
  componentWillUnmount: function() {
    ReactBootstrap.Dispatcher.off('newcomment:reset',this._onReset);
  },
  _onReset: function(id){
    if(id == this.props.source._id) {
      this.refs.commentContent.getDOMNode().innerHTML = '';
      this.setState({
        disabledOkBtn: true,
        disabledCancelBtn: false
      });
    }
  },
  _onExpand: function(){
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
    var holder = <Entity entity='inputNewComment' />;
    var footerClass = classSet({
      'hide': !this.props.expanded && this.props.hideHolder,
      'newcomment': true
    });
    var collapsedClass = classSet({
      'hide': this.props.expanded || this.props.hideHolder,
      'newcomment-holder': true
    });

    var expandedClass = classSet({
      'hide': !this.props.expanded
    });
    var okBtn = <Button ref='okBtn' bsStyle='success' onClick={this._handleOk}><Entity entity='submitComment'/></Button>;
    if(this.state.disabledOkBtn) {
      okBtn = <Button ref='okBtn' disabled bsStyle='success' onClick={this._handleOk}><Entity entity='submitComment'/></Button>;
    }
    var cancelBtn = <Button ref='cancelBtn' style={{marginLeft:'4px'}} bsStyle='darkgray50' onClick={this._handleCancel}><Entity entity='cancel'/></Button>;
    if(this.state.disabledCancelBtn) {
      cancelBtn = <Button ref='cancelBtn' disabled style={{marginLeft:'4px'}} bsStyle='darkgray50' onClick={this._handleCancel}><Entity entity='cancel'/></Button>;
    }
    return (
      <PanelFooter className={footerClass} style={{borderTop:0}}>
        <Input className={collapsedClass} type='text' placeholder={this.state.entity} onClick={this._onExpand}
               style={{border: '1px solid #d8d8d8'}}/>
        <Grid className={expandedClass} >
          <Row>
            <Col xs={2} style={{padding:0}}>
              <img src={this.state.user.avatar} className="comment-avatar"/>
            </Col>
            <Col xs={10} className="newcomment-main bg-white">
              <div ref="commentContent" onKeyUp={this._handleChange} contentEditable placeholder={holder} className="newcomment-editor"></div>
            </Col>
          </Row>
          <div className='text-right' style={{marginTop:'20px',marginRight:'-20px'}}>
            {okBtn}
            {cancelBtn}
          </div>
        </Grid>
      </PanelFooter>
    )
  }
});

module.exports = NewComment;