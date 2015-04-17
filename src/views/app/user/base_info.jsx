/**
 * Created by steven on 15/4/9.
 */
var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var BaseInfo = React.createClass({
  render: function(){
    var fansCount = 0;
    var followedCount = 0;
    var post_count = 0;
    var avatar="";
    var name=""

    if (this.props.models) {
      if (this.props.models.users) {
        var user = this.props.models.users.get();
        name = user.username;
        if (this.props.users.fans) {
          this.props.users.fans.forEach(function () {
            fansCount++;
          });
        }
        if (this.props.user.followed) {
          this.props.user.followed.forEach(function () {
            followedCount++;
          });
        }
        post_count = this.props.user.post_count;
        if (this.props.user.avatar) {
          avatar = this.props.user.avatar;
        }
      }
    }
    var style = {};//this.props.style;
    style.padding = 12.5;
    return (
        <Grid style={style}>
          <Row>
            <Link to="/">
              <Col xs={4} className="text-center" style={{borderRight:"1px solid #AAAAAA"}}>
                <div style={{marginLeft:'5px',fontSize:20}} className="infonum"><strong>{followedCount}</strong></div>
                <div style={{marginLeft:'5px',fontSize:12}}><Entity entity='followCount'/></div>
              </Col>
            </Link>
            <Link to="/">
              <Col xs={4} className="text-center"  style={{borderRight:"1px solid #AAAAAA"}}>
                <div style={{marginLeft:'5px',fontSize:20}} className="infonum"><strong>{fansCount}</strong></div>
                <div style={{marginLeft:'5px',fontSize:12}}><Entity entity='fansCount'/></div>
              </Col>
            </Link>
            <Link to="/">
              <Col xs={4} className="text-center">
                <div style={{marginLeft:'5px',fontSize:20}} className="infonum"><strong>{post_count}</strong></div>
                <div style={{marginLeft:'5px',fontSize:12}}><strong><Entity entity='postCount'/></strong></div>
              </Col>
            </Link>
          </Row>
        </Grid>
    );
  }
});

module.exports = BaseInfo;