var l20n = require('../global/vendor/l20n/l20n.jsx');
var ApplicationSidebar = React.createClass({
  render: function() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-header'></div>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}}>
                  <SidebarNavItem glyph='icon-fontello-home-1' name={<Entity entity='sidebarHome'/>} href='/posts' />
                  <SidebarNavItem glyph='icon-fontello-network' name={<Entity entity='sidebarCircle'/>} href='/circle' />
                  <SidebarNavItem glyph='icon-fontello-feather-1' name={<Entity entity='sidebarCommunities'/>} href='/communities' />
                  <SidebarNavItem glyph='icon-fontello-article-alt-1' name={<Entity entity='sidebarBlog'/>} href='/blogs' />
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
        <hr style={{borderColor: '#3B4648', borderWidth: 2, marginTop: 15, marginBottom: 0, width: 200}} />
        <Grid gutterBottom>
          <Row>
            <Col xs={12}>
              <div className='sidebar-header'></div>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}}>
                  <SidebarNavItem glyph='icon-fontello-login-2' name={<Entity entity='login'/>} href='/login' />
                  <SidebarNavItem glyph='icon-fontello-user-add' name={<Entity entity='signup'/>}  href='/signup' />
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});


var SidebarSection = React.createClass({
  render: function() {
    return (
      <div id='sidebar' {...this.props}>
        <ApplicationSidebar />
      </div>
    );
  }
});

module.exports = SidebarSection;
