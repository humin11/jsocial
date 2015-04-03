var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var AuthStore = require('../stores/auth_store.jsx');

var classSet = React.addons.classSet;
var LoginPage = React.createClass({
  mixins: [SidebarMixin,ReactRouter.State, ReactRouter.Navigation],
  statics: {
    attemptedTransition: null
  },
  getInitialState: function () {
    return {
      error: false
    };
  },
  _handleSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    AuthStore.signIn(email, password, function (err, user) {
      if (err || !user) {
        return this.setState({ error: true });
      }
      this.retryTransition();
    }.bind(this));
  },
  retryTransition: function () {
    if (LoginPage.attemptedTransition) {
      var transition = LoginPage.attemptedTransition;
      LoginPage.attemptedTransition = null;
      transition.retry();
    } else {
      this.replaceWith("/");
    }
  },
  componentDidMount: function() {
    $('html').addClass('authentication');
    AuthStore.addChangeListener(this.retryTransition);
  },
  componentWillUnmount: function() {
    $('html').removeClass('authentication');
    AuthStore.removeChangeListener(this.retryTransition);
  },
  render: function() {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Container id='auth-container' className='login'>
          <Container id='auth-row'>
            <Container id='auth-cell'>
              <Grid>
                <Row>
                  <Col sm={12}>
                    <PanelContainer noControls>
                      <Panel>
                        <PanelBody style={{padding: 0}}>
                          <div className='text-center bg-darkblue fg-white'>
                            <h3 style={{margin: 0, padding: 25}}>Sign in to MySocial</h3>
                          </div>
                          <div className='bg-hoverblue fg-black50 text-center' style={{padding: 12.5}}>
                            <div>You need to sign in for those awesome features</div>
                            <div style={{marginTop: 12.5, marginBottom: 12.5}}>
                              <Button id='facebook-btn' lg bsStyle='darkblue' type='submit' onClick={this.back}>
                                <Icon glyph='icon-fontello-qq' />&nbsp;&nbsp;
                                <span>Sign in <span className='hidden-xs'>with QQ</span></span>
                              </Button>
                            </div>
                            <div>
                              <a id='twitter-link' href='#' onClick={this._handleSubmit}><Icon glyph='icon-fontello-sina-weibo' /><span> or with Weibo</span></a>
                            </div>
                          </div>
                          <div>
                            <div className='text-center' style={{padding: 12.5}}>
                              or use your MySocial account
                            </div>
                            <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                              <Form onSubmit={this._handleSubmit}>
                                <FormGroup>
                                  <InputGroup lg>
                                    <InputGroupAddon>
                                      <Icon glyph='icon-fontello-mail' />
                                    </InputGroupAddon>
                                    <Input autoFocus type='email' ref='email' className='border-focus-blue' placeholder='whosyourdaddy@gmail.com' />
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <InputGroup lg>
                                    <InputGroupAddon>
                                      <Icon glyph='icon-fontello-key' />
                                    </InputGroupAddon>
                                    <Input type='password' ref='password' className='border-focus-blue' placeholder='password' />
                                  </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                  <Grid>
                                    <Row>
                                      <Col xs={6} collapseLeft collapseRight style={{paddingTop: 10}}>
                                        <Link to='/signup'>Create a MySocial account</Link>
                                      </Col>
                                      <Col xs={6} collapseLeft collapseRight className='text-right'>
                                        <Button outlined lg type='submit' bsStyle='blue'>Login</Button>
                                      </Col>
                                    </Row>
                                  </Grid>
                                </FormGroup>
                              </Form>
                            </div>
                          </div>
                        </PanelBody>
                      </Panel>
                    </PanelContainer>
                  </Col>
                </Row>
              </Grid>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
});

module.exports = LoginPage;
