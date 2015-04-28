var docCookies = require('./cookies.js');

var Brand = React.createClass({
  render: function() {
    return (
      <NavHeader {...this.props}>
        <NavBrand tabIndex='-1'>
          <Icon glyph='icon-fontello-garden' style={{fontSize:28}} />
        </NavBrand>
      </NavHeader>
    );
  }
});

var LocaleMenuItem = React.createClass({
  render: function() {
    return (
      <MenuItem flag={this.props.flag} locale={this.props.locale} parent={this.props.parent} href='#' active={this.props.active}>
        <Grid>
          <Row>
            <Col xs={2}>
              <img src={'/imgs/flags/flags/flat/32/'+this.props.flag+'.png'} width='32' height='20' />
            </Col>
            <Col xs={10}>
              <Entity className='lang-menu-text' entity='languageMenu' data={{lang: this.props.lang}} />
            </Col>
          </Row>
        </Grid>
      </MenuItem>
    );
  }
});

var DirectNavItem = React.createClass({
  mixins: [ReactRouter.State, ReactRouter.Navigation],
  render: function() {
    var classes = React.addons.classSet({
      'pressed': (this.getPathname() === this.props.path)
    });
    return (
      <NavItem className={classes.trim()} {...this.props}>
        <Link to={this.props.path}>
          <Icon bundle={this.props.bundle || 'fontello'} glyph={this.props.glyph} />
        </Link>
      </NavItem>
    );
  }
});

var Navigation = React.createClass({
  mixins: [ReactRouter.State, ReactRouter.Navigation],
  getInitialState: function() {
    return {
      selectedFlag: 'China'
    };
  },
  changeFlag: function(props) {
    this.setState({
      selectedFlag: props.flag
    }, function() {
      if(props.locale === 'ar')
        $('html').addClass('arabic');
      else
        $('html').removeClass('arabic');
      Preloader.show();
      l20n.changeLocale(props.locale);
    }.bind(this));
  },
  l20nContextReady: function() {
    var selectedFlag = l20n.ctx.getSync('selectedFlag');
    this.state.selectedFlag = selectedFlag;
    this.refs['flag-menu'].selectItem('flag', selectedFlag);
    this.setState(this.state, function() {
      Preloader.hide();
    });
  },
  componentWillMount: function() {
    ReactBootstrap.Dispatcher.on('ctx:ready', this.l20nContextReady);
  },
  componentDidMount: function() {
    (function() {
      var item = localStorage.getItem('settingsMenu');
      localStorage.setItem('settingsMenu', item || 'fluid');
    }.bind(this))();
  },
  componentWillUnmount: function() {
    ReactBootstrap.Dispatcher.off('ctx:ready', this.l20nContextReady);
  },
  render: function() {
    return (
      <NavContent className='pull-right' {...this.props}>
        <Nav className='hidden-xs'>
          <NavItem dropdown>
            <DropdownButton id='flag-menu-btn' nav container={this} menu='flag-menu'>
              <img src={'/imgs/flags/flags/flat/32/' + this.state.selectedFlag + '.png'} width='16' height='16' />
            </DropdownButton>
            <Menu alignRight noTimer bsStyle='theme' ref='flag-menu' id='flag-menu' className='double-width' onItemSelect={this.changeFlag}  style={{paddingBottom: 0}}>
              <MenuItem header>
                <Entity entity='languageMenuHeading'/>
              </MenuItem>
              <LocaleMenuItem lang='enUS' locale='en-US' flag='United-States'/>
              <LocaleMenuItem lang='fr' locale='fr' flag='France'/>
              <LocaleMenuItem lang='it' locale='it' flag='Italy'/>
              <LocaleMenuItem lang='ge' locale='ge' flag='Germany'/>
              <LocaleMenuItem lang='ar' locale='ar' flag='Saudi-Arabia'/>
              <LocaleMenuItem lang='ch' locale='ch' flag='China'/>
            </Menu>
          </NavItem>
        </Nav>
        <Nav>
          <DirectNavItem glyph="bell-1" path="/app"/>
        </Nav>
        <Nav>
          <NavItem className='logout' href='#' onClick={this.handleLogout}>
            <img src='/imgs/avatars/avatar4.png' width='25' height='25' />
          </NavItem>
        </Nav>
      </NavContent>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <NavBar fixedTop id='rubix-nav-header'>
              <Container fluid>
                <Row>
                  <Col xs={3} visible='xs sm'>
                    <SidebarBtn />
                  </Col>
                  <Col xs={3} sm={4}>
                  </Col>
                  <Col xs={6} sm={8}>
                    <Navigation pressed={this.props.pressed} />
                  </Col>
                </Row>
              </Container>
            </NavBar>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Header;
