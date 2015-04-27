var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var DataMinix = require('../../mixins/data_mixin.jsx');
var NewCircle = require('./new_circle.jsx');
var Circle = React.createClass({
  mixins: [DataMinix],
  render: function(){
    //var persons = {};
    //this.reactList("user.follows",2,function(item){
    //  return <Row>{item}</Row>,
    //})
    //this.props
    return (
      <PanelContainer noControls >
        <PanelHeader style={{height:'150px'}}>
        </PanelHeader>
        <PanelBody style={{height:'150px'}}>
          <div class="iP Vua eqa d-k-l pTa" role="link" tabindex="0" oid="113116318008017777871" email="" hc="off" style="width: 213px; height: 80px; line-height: 80px; margin-right: 35px;">
            <div class="uja">
            </div>
            <div class="tja">
            </div>
            <div class="rja">
            </div>
            <div class="sja">
            </div>
            <img src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg" style={{width: '80px', height: '80px'}}/>
            <div class="Pua Vua">
              <div class="nnb">Bradley Horowitz</div>
            </div>
            <div class="lnb h6a" style="display: none; opacity: 0;">
            </div>
            <div class="qnb j6a" style="display:none">
            </div>
            <div class="k6a tnb"></div>
            <div class="bxa"></div>
          </div>
        </PanelBody>
      </PanelContainer>
    );
  }
});

var AllCircle = React.createClass({
  mixins: [DataMinix],
  render: function(){
    var result = this.reactList("user.circles",4,
      function(data){return <Circle circle = {data}/>;},
      function(col){return <Col sm={3} collapseRight>{col}</Col>;}
    );
    return (
      <Grid id="allfollowed">
        aaaaa
        <Row>
          <Circle {...this.props}/>
        <Col><NewCircle {...this.props}/></Col>
        </Row>
        <Row>
          {result}
        </Row>
      </Grid>
    );
  }
});

module.exports = AllCircle;