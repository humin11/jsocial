var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var Authentication = require('../../mixins/auth_mixin.jsx');

var NewPost = React.createClass({
  mixins:[Authentication],
  getInitialState: function() {
    return {
      entity: '',
      disabledOkBtn: true
    };
  },
  componentDidMount: function() {
    l20n.ctx.localize(['inputNewPost'], function(l) {
      this.setState({
        entity: l20n.ctx.getSync('inputNewPost')
      });
    }.bind(this));
    if(!Modernizr.touch) {
      $(this.refs.postContent.getDOMNode()).perfectScrollbar({
        suppressScrollX: true
      });
    }
  },
  componentWillUnmount: function() {
    $(this.refs.postContent.getDOMNode()).perfectScrollbar('destroy');
  },
  _handleChange: function(){
    if(this.refs.postContent.getDOMNode().innerText.length > 0){
      this.setState({ disabledOkBtn: false });
    }else{
      this.setState({ disabledOkBtn: true });
    }
  },
  _handleClick: function(){
    var content = this.refs.postContent.getDOMNode().innerText;
    AppDispatcher.dispatch({
      type: ActionTypes.POSTS_CREATE,
      data: {content:content}
    });
    this.refs.postContent.getDOMNode().innerHTML = '';
  },
  render: function () {
    if(!this.state.isLoggedIn)
      return null;

    var btn = <Button onClick={this._handleClick} bsStyle='darkgreen45'><Entity entity='share'/></Button>;
    if(this.state.disabledOkBtn) {
      btn = <Button disabled onClick={this._handleClick} bsStyle='darkgreen45'><Entity entity='share'/></Button>;
    }
    return (
      <PanelContainer noControls className="newpost">
        <PanelBody style={{padding: 12.5}} className="newpost-main">
          <div ref="postContent" onKeyUp={this._handleChange} contentEditable placeholder={this.state.entity} className="newpost-editor"></div>
        </PanelBody>
        <PanelFooter className='fg-black75 bg-gray' style={{padding: '12.5px 25px'}}>
          <Grid>
            <Row>
              <Col xs={6} collapseLeft collapseRight>
                <a href='#' style={{border: 'none'}}><Icon glyph='icon-dripicons-camera icon-1-and-quarter-x fg-text' style={{marginRight: 25}} /></a>
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