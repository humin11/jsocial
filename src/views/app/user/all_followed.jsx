var AppDispatcher = require('../../dispatcher/dispatcher.jsx');
var ActionTypes = require('../../constants/constants.jsx');

var Followed = React.createClass({
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
                {0}
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
  render: function(){
    var result = [];
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