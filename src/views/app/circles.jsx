/**
 * Created by steven on 15/4/9.
 */
var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var UserInfo = require('./user/base_info.jsx');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');
var StoreMixin = require('../mixins/store_mixin');
var ReactDom = require('../mixins/data_mixin.jsx');
var AllCircle = require('./circles/all_circle.jsx');

var classSet = React.addons.classSet;

var _circlesColor = ["#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36"];

function circlesColor(index){
  return _circlesColor[_circlesColor.length % index];
}

var Body = React.createClass({
  _handlePersonOut:function(){

    //this.refs.circles1.getDOMNode().style["border"]="5px solid #fff";
  },
  _handlePersonOver:function(){

    //this.refs.circles1.getDOMNode().style["border"]="5px solid #000";
    //onMouseOut={this._handleMouseOut} onMouseOver={this._handleMouseOver}
  },
  _handleCirclesOut:function(){

  },
  _handleCirclesOver:function(){

  },
  mixins: [ReactDom],
  render: function() {
    var panname="circles1";
    var person={};
    for(var i=0;i<10;i++) {
      person["person-" + i] = <Col onMouseOut={this._handlePersonOut} onMouseOver={this._handlePersonOver} sm={3}>
        <Panel ref={panname} className='circle-person'>
          <img
            src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
          <span style={{paddingLeft:10}}>张三</span>
          <Icon ref="toolbtn" glyph='icon-nargela-close'/>
        </Panel>
      </Col>
    }
    var circles={};
    for(var i=0;i<10;i++) {
      if (i%2==0){
        circles["circle-" + i]=<Col sm={1}/>
      }
      else{
        var colors={backgroundColor:circlesColor(i)};
        circles["circle-" + i] = <Col onMouseOut={this._handleCirclesOut} onMouseOver={this._handleCirclesOver} sm={2} style={colors} className='circle-circle'>
          <Grid>
            <Row>
              <Col sm={4}>
                <img src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
              </Col>
              <Col sm={4}>
                <img src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
              </Col>
              <Col sm={4}>
                <img src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <img src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
              </Col>
              <Col sm={3}>
                <span>朋友</span>
                <div>0</div>
              </Col>
              <Col sm={3}>
                <img src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <img src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
              </Col>
              <Col sm={4}>
                <img src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
              </Col>
              <Col sm={4}>
                <img src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
              </Col>
            </Row>
          </Grid>
        </Col>
      }
    }
    return (
      <Container id='body' className='users'>
        <PanelContainer>
          <PanelHeader style={{backgroundColor:'#e5e5e5',height:'300px'}}>
            加人
            <Grid>
              <Row>
                {person}
              </Row>
            </Grid>
          </PanelHeader>
          <PanelBody style={{height:'150px',backgroundColor:'#999999'}}>
            将上面的人拖动
            <Grid>
              <Row>
                {circles}
              </Row>
            </Grid>
          </PanelBody>
        </PanelContainer>
      </Container>
    );
  }
});

var Circles = React.createClass({
  mixins: [StoreMixin,SidebarMixin],
  render: function () {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Sidebar {...this.state}/>
        <Header pressed/>
        <Body {...this.state}/>
        <Footer />
      </Container>
    );
  }
});

module.exports = Circles;