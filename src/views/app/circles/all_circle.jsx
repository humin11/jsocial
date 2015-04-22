var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var ReactDom = require('../../mixins/data_mixin.jsx');
var NewCircle = require('./new_circle.jsx');
var Circle = React.createClass({
  mixins: [ReactDom],
  render: function(){
    return (
      <PanelContainer noControls >
        <PanelHeader style={{height:'150px'}}>
          <div className="text-center">
            <img src={this.props.circles.avatar}/>
          </div>
        </PanelHeader>
        <PanelBody style={{height:'150px'}}>
          <Link to='/users'>
            <div className="follow-content">
              <strong>{this.props.circles.name}</strong>
              <Icon glyph='icon-mfizz-ruby' />
              <div>
                {this.props.followed.introduce}
              </div>
              <ButtonGroup>
                <Button xs outlined>
                  <Icon glyph='icon-simple-line-icons-user-following' />
                </Button>
                <Button xs outlined>
                  <Icon glyph='icon-simple-line-icons-speech' />
                </Button>
                <Button xs outlined>
                  <Icon glyph='icon-simple-line-icons-settings'/>
                </Button>
              </ButtonGroup>
            </div>
          </Link>
        </PanelBody>
      </PanelContainer>
    );
  }
});

var AllCircle = React.createClass({
  mixins: [ReactDom],
  render: function(){
    var result = this.reactList("user.circles",4,
      function(data){return <Circle circle = {data}/>;},
      function(col){return <Col sm={3} collapseRight>{col}</Col>;}
    );
    return (
      <Grid id="allfollowed">
        <Row>
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