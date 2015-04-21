/**
 * Created by steven on 15/4/9.
 */
var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var BaseInfo = require('./base_info.jsx');
var ReactDom = require('../../mixins/data_mixin.jsx');

var UserInfo = React.createClass({
  mixins: [ReactDom],
  render: function(){
    return (
      <PanelContainer noControls id="recommend-people">
        <PanelHeader>
          <Link to='/users'>
            <div className="text-center" style={{height:100,backgroundImage:'url(/imgs/shots/Blick_auf_Manhattan.JPG)'}}>
              <img src={this.getDefaultData('user','name','/imgs/avatars/avatar0.png')} width='60' height='60'
                   style={{borderRadius: '30px',marginTop:'65px'}}/>
            </div>
          </Link>
          <Link to='/users'>
            <div className="text-center" style={{marginTop:'30px'}}>
              <strong>{this.getDefaultData("user","name","")}<Entity entity='farm'/></strong>
            </div>
          </Link>
        </PanelHeader>
        <PanelBody>
          <BaseInfo style={{marginTop:'-20px'}} {...this.props}/>
        </PanelBody>
      </PanelContainer>
    );
  }
});

module.exports = UserInfo;