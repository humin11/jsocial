var ConfirmDialog = React.createClass({
  _handleOk: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.handler();
    vex.close(this.props.id);
  },
  _handleCancel: function(e) {
    e.preventDefault();
    e.stopPropagation();
    vex.close(this.props.id);
  },
  render: function() {
    return (
      <Grid style={{margin: '-2em'}}>
        <Row>
          <Col xs={12} className='text-center bg-darkgrayishblue75' style={{marginBottom: 25}}>
            <div className='fg-white' style={{fontSize: 24, lineHeight: 1, padding: '25px 10px'}}>
              <Entity entity='yesOrNo'/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={3} className='text-center'>

          </Col>
          <Col xs={3} className='text-center'>
            <Button ref='cancelBtn' bsStyle='default' onClick={this._handleCancel}><Entity entity='cancel'/></Button>
          </Col>
          <Col xs={3} className='text-center'>
            <Button ref='okBtn' bsStyle='primary' onClick={this._handleOk}><Entity entity='ok'/></Button>
          </Col>
          <Col xs={3} className='text-center'>

          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = ConfirmDialog;