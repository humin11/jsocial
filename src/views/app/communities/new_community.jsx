var NewCommunity = React.createClass({
  getInitialState: function () {
    return {
      publicClicked: false,
      privateClicked: false
    };
  },
  _handleOk: function(e) {
    e.preventDefault();
    e.stopPropagation();
    vex.close(this.props.id);
  },
  _handleCancel: function(e) {
    e.preventDefault();
    e.stopPropagation();
    vex.close(this.props.id);
  },
  _handlePublicClicked: function(){
    this.setState({
      publicClicked: true,
      privateClicked: false
    });
  },
  _handlePrivateClicked: function(){
    this.setState({
      publicClicked: false,
      privateClicked: true
    });
  },
  render: function() {
    var publicInfoClass = React.addons.classSet({
      'hide': this.state.publicClicked,
      'new-community-info': true
    });
    var privateInfoClass = React.addons.classSet({
      'hide': this.state.privateClicked,
      'new-community-info': true
    });
    var publicInputClass = React.addons.classSet({
      'hide': !this.state.publicClicked,
      'new-community-info': true
    });
    var privateInputClass = React.addons.classSet({
      'hide': !this.state.privateClicked,
      'new-community-info': true
    });
    var publicOpacityStyle = {opacity: 1};
    var privateOpacityStyle = {opacity: 1};
    if(this.state.publicClicked)
      privateOpacityStyle = {opacity: .4};
    if(this.state.privateClicked)
      publicOpacityStyle = {opacity: .4};
    return (
      <Grid style={{margin: '-2em'}} className="new-community">
        <Row>
          <Col xs={12} className='text-left bg-white' >
            <div className='fg-black' style={{fontSize: 24, lineHeight: 1, padding: '25px 10px'}}>
              <Entity entity='communityWhich'/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} >
            <PanelContainer noControls style={publicOpacityStyle} className="new-community-public" onClick={this._handlePublicClicked}>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3 style={{marginLeft:0}}>
                      <Entity entity='communityPublic'/>
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className={publicInfoClass}>
                      <Entity entity='communityPublicInfo'/>
                    </div>
                    <div className={publicInputClass} >
                      <Entity entity='communityNamed'/>
                      <Input ref="publicCommunityName" type='text'/>
                      <Entity entity='communityFreeJoin'/>
                      <Select ref='freeJoin' defaultValue='1'>
                        <Entity entity='communityFreeJoinYes' componentClass="option" value='1'/>
                        <Entity entity='communityFreeJoinNo' componentClass="option" value='0'/>
                      </Select>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </PanelContainer>
          </Col>
          <Col xs={6} >
            <PanelContainer noControls style={privateOpacityStyle} className="new-community-private" onClick={this._handlePrivateClicked}>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <h3 style={{marginLeft:0}}><Entity entity='communityPrivate'/></h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className={privateInfoClass}>
                      <Entity entity='communityPrivateInfo'/>
                    </div>
                    <div className={privateInputClass} >
                      <Entity entity='communityNamed'/>
                      <Input ref="privateCommunityName" type='text'/>
                      <Entity entity='communityAllowSearch'/>
                      <Select ref='allowSearch' defaultValue='0'>
                        <Entity entity='communityAllowSearchYes' componentClass="option" value='1'/>
                        <Entity entity='communityAllowSearchNo' componentClass="option" value='0'/>
                      </Select>
                    </div>
                  </Col>
                </Row>
              </Grid>
            </PanelContainer>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className='text-right' >
            <Button ref='cancelBtn' bsStyle='default' onClick={this._handleCancel} style={{marginRight:'10px'}}><Entity entity='cancel'/></Button>
            <Button ref='okBtn' bsStyle='darkblue' onClick={this._handleOk}><Entity entity='communityCreate'/></Button>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = NewCommunity;