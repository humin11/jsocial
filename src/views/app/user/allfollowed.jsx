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

var reactList=function(stores,name,listcount,row,col){
  var cols=[];
  for(var i=0;i<listcount;i++) {
    cols[i] = [];
  }
  if (stores){
    for(var i=0;i<stores[name].length;i++){
      var index = i % cols.length;
      var f = cols[index];
      f[f.length] = row(stores[name][i]);
    }
  }
  var result=[];
  for(var i=0;i<cols.length;i++){
    result[i] = col(cols[i]);
  }
  return result;
};

var AllFollowed = React.createClass({
  render: function(){
    var result = reactList(this.props.users,"followed",4,function(data){
      return <Followed followed = {data}/>
    },
      function(col){
        return <Col sm={3} collapseRight>{col}</Col>;
      }
    );
    console.log(result);
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