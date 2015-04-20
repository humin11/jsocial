var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');
var ReactDom = require('../../mixins/react_Dom.jsx');

var Followed = React.createClass({
  mixins: [ReactDom],
  render: function(){
    return (
      <PanelContainer noControls >
        <PanelHeader style={{height:'150px'}}>
          <div className="text-center">
            <img src={this.props.followed.avatar}/>
          </div>
        </PanelHeader>
        <PanelBody style={{height:'150px'}}>
          <Link to='/users'>
            <div className="follow-content">
              <strong>{this.props.followed.name}</strong>
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

var AllFollowed = React.createClass({
  mixins: [ReactDom],
  render: function(){
    var result = this.reactList("user.followed",4,
      function(data){return <Followed followed = {data}/>;},
      function(col){return <Col sm={3} collapseRight>{col}</Col>;}
    );
    return (
        <Grid id="allfollowed">
          <Row>
            {result}
          </Row>
        </Grid>
    );
  }
});

module.exports = AllFollowed;