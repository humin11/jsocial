var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var UsersStore = require('../../stores/users_store.jsx');
var PostStore = require('../../stores/posts_store.jsx');
var classSet = React.addons.classSet;

var NewComment = React.createClass({
  getInitialState: function () {
    return {
      expanded: false,
      disabledOkBtn: true,
      disabledCancelBtn: false,
      author: UsersStore.getUser(),
      isLoggedIn: UsersStore.isLoggedIn()
    };
  },
  componentDidMount: function() {
    UsersStore.addChangeListener(this._onLogin);
    PostStore.addCommentCreateListener(this._onCreateComplete);
  },
  componentWillUnmount: function() {
    UsersStore.removeChangeListener(this._onLogin);
    PostStore.removeCommentCreateListener(this._onCreateComplete);
  },
  _onLogin: function(){
    this.setState({
      author: UsersStore.getUser(),
      isLoggedIn: UsersStore.isLoggedIn()
    });
  },
  _onCreateComplete: function(post){
    if(post._id == this.props.source._id) {
      this._handleCancel();
    }
  },
  _handleExpand: function(){
    this.setState({ expanded: true });
  },
  _handleOk: function(){
    var content = this.refs.commentContent.getDOMNode().innerText;
    AppDispatcher.dispatch({
      type: ActionTypes.COMMENTS_CREATE,
      data: {content:content,source:this.props.source}
    });
    this.setState({
      disabledOkBtn: true,
      disabledCancelBtn: true
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
    if(this.props.hideCommentHolder) {
      this.props.parent._handleNewComment();
    }else{
      this.setState({
        expanded: false,
        disabledOkBtn: true,
        disabledCancelBtn: false
      });
    }
  },
  render: function () {
    if(!this.state.isLoggedIn)
      return <noscript></noscript>;
    var holder = l20n.ctx.getSync('inputNewComment',null);
    var footerClass = classSet({
      'hide': !(this.state.expanded || this.props.expanded) && this.props.hideCommentHolder,
      'bg-gray': true
    });
    var inputClass = classSet({
      'hide': this.state.expanded || this.props.hideCommentHolder
    });
    var divClass = classSet({
      'hide': !(this.state.expanded || this.props.expanded)
    });
    var footerPadding = '15px 25px 15px 25px';
    if(this.state.expanded) {
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
      <PanelFooter style={{marginTop:0, padding: footerPadding, borderTop: 0}} className={footerClass}>
        <Input className={inputClass} type='text' placeholder={holder}  onClick={this._handleExpand}
               style={{border: '1px solid #d8d8d8'}}/>
        <Grid className={divClass}>
          <Row>
            <Col xs={2}>
              <img src={this.state.author.avatar} width='30' height='30'
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