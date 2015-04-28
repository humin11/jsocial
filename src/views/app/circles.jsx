/**
 * Created by steven on 15/4/9.
 */
var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var UserInfo = require('./user/base_info.jsx');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');

var classSet = React.addons.classSet;

var _circlesColor = ["#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36","#002b36"];

function circlesColor(index){
  return _circlesColor[_circlesColor.length % index];
}

var select=0;

var Person = React.createClass({
  mixins: [SidebarMixin],
  getInitialState: function () {
    var followed = this.props.followed;
    var circles = this.getData('CirclesStore','getFollowed',[],followed._id);
    return {
      followed:followed,
      circles:circles
    };
  },
  render:function(){
    var button = <span><Entity entity='circlesNoHave'/></span>
    if (this.state.circles.length>0){
      button = <span>{this.state.circles.length}<Entity entity='circlesHave'/></span>
    }
    return <Panel className="circle-person">
      <img
        src="//lh3.googleusercontent.com/-iyQOUVWQFto/AAAAAAAAAAI/AAAAAAAFyjs/l_c8cbqvDMM/s144-c-k-no/photo.jpg"/>
      <span style={{paddingLeft:10}}>张三</span>
      <Button className="pull-right" style={{paddingRight:20}}>{button}</Button>
      </Panel>
  }
})

var Body = React.createClass({
  mixins: [SidebarMixin],
  _handleCirclesSelect:function(){
    console.log(this.props);
  },
  _handleCirclesSet:function(){
    console.log(this.props);
  },
  render: function() {
    //var panname="circles1";
    var person={};

    for(var i=0;i<10;i++) {
      person["person" + i]=<Row><Person followed={person}/></Row>
    }
    return (
      <Container id='body' className='users'>
        <Grid>
            {person}
        </Grid>
      </Container>
    );
  }
});

var Circles = React.createClass({
  mixins: [SidebarMixin],
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