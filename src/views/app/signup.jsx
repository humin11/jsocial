var Header = require('../common/header.jsx');
var Sidebar = require('../common/sidebar.jsx');
var Footer = require('../common/footer.jsx');
var UsersStore = require('../stores/users_store.jsx');
var AppDispatcher = require('../dispatcher/dispatcher.jsx');
var ActionTypes = require('../constants/constants.jsx');

var Body = React.createClass({
  mixins: [ReactRouter.State, ReactRouter.Navigation],
  getInitialState: function () {
    return {
      error: false
    };
  },
  _handleSubmit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var username = this.refs.username.getValue();
    var email = this.refs.email.getValue();
    var password = this.refs.password.getValue();
    AppDispatcher.dispatch({
      type: ActionTypes.USERS_SIGNUP,
      data:{
        username: username,
        name: username,
        email: email,
        password: password
      }
    });
  },
  retryTransition: function () {
    if(UsersStore.isLoggedIn())
      this.replaceWith("/");
    else
      this.setState({error:true});
  },
  componentDidMount: function() {
    $('html').addClass('authentication');
    UsersStore.addChangeListener(this.retryTransition);
  },
  componentWillUnmount: function() {
    $('html').removeClass('authentication');
    UsersStore.removeChangeListener(this.retryTransition);
  },
  renderErrorBlock: function () {
    return this.state.error ? <p className="help-block">email already in used</p> : null;
  },
  render: function() {
    return (
      <Container id='auth-container' className='signup'>
        <Container id='auth-row'>
          <Container id='auth-cell'>
            <Grid>
              <Row>
                <Col sm={12}>
                  <PanelContainer noControls>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <div className='text-center bg-darkblue fg-white'>
                          <h3 style={{margin: 0, padding: 25}}><Entity entity='signupNew'/></h3>
                        </div>
                        <div>
                          <div style={{padding: 25, paddingTop: 0, paddingBottom: 0, margin: 'auto', marginBottom: 25, marginTop: 25}}>
                            <Form onSubmit={this._handleSubmit}>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-user' />
                                  </InputGroupAddon>
                                  <Entity componentClass='Input' autoFocus type='text' ref='username' className='form-control border-focus-blue' entity='signupUsername'/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-mail' />
                                  </InputGroupAddon>
                                  <Entity componentClass='Input' autoFocus type='text' ref='email' className='form-control border-focus-blue' entity='signupEmail'/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <InputGroup lg>
                                  <InputGroupAddon>
                                    <Icon glyph='icon-fontello-key' />
                                  </InputGroupAddon>
                                  <Entity componentClass='Input' autoFocus type='text' ref='password' className='form-control border-focus-blue' entity='signupPassword'/>
                                </InputGroup>
                              </FormGroup>
                              <FormGroup>
                                <Grid>
                                  <Row>
                                    <Col xs={12} collapseLeft collapseRight>
                                      <Button type='submit' outlined lg bsStyle='blue' block>
                                        <Entity entity='signupCreateAccount'/>
                                      </Button>
                                    </Col>
                                  </Row>
                                </Grid>
                              </FormGroup>
                            </Form>
                            {this.renderErrorBlock()}
                          </div>
                          <div className='bg-hoverblue fg-black50 text-center' style={{padding: 25, paddingTop: 12.5}}>
                            <div style={{marginBottom: 12.5}}><Entity entity='signupWith'/></div>
                            <Grid>
                              <Row>
                                <Col xs={12} sm={6} className='facebook-container' smCollapseLeft smCollapseRight>
                                  <Button block type='submit' id='facebook-btn' lg bsStyle='darkblue' onClick={this.back}>
                                    <Icon glyph='icon-fontello-qq' />
                                    <span>QQ</span>
                                  </Button>
                                </Col>
                                <Col xs={12} sm={6} className='' smCollapseLeft smCollapseRight>
                                  <Button block type='submit' id='twitter-btn' lg bsStyle='darkblue' onClick={this.back}>
                                    <Icon glyph='icon-fontello-sina-weibo' />
                                    <span>Weibo</span>
                                  </Button>
                                </Col>
                              </Row>
                            </Grid>
                            <div style={{marginTop: 25}}>
                              <Entity entity='signupHaveAccount'/><Link to='/login'><Entity entity='login'/></Link>
                            </div>
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
    );
  }
});

var classSet = React.addons.classSet;
var SignupPage = React.createClass({
  mixins: [SidebarMixin],
  render: function() {
    var classes = classSet({
      'container-open': this.state.open
    });
    return (
      <Container id='container' className={classes}>
        <Body/>
      </Container>
    );
  }
});

module.exports = SignupPage;
