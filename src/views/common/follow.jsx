/**
 * Created by steven on 15/4/9.
 */
var Follow = React.createClass({
  getDefaultProps: function() {
    return {
      id: null
    }
  },
  _handleFollow: function(){
    alert(this.props.id);
  },
  render: function(){
    return (
      <Button xs ref='follow' outlined bsStyle='default' onClick={this._handleFollow}>
        <Icon bundle='fontello' glyph='user'/>
        <span style={{marginLeft:'5px'}}><Entity entity='follow'/></span>
      </Button>
    );
  }
});


module.exports = Follow;