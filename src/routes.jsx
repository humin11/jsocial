/* ERROR PAGES */
var notfound = require('./views/app/notfound.jsx');

/* HOMEPAGE */

/* APP PAGES */
var gallery = require('./views/app/gallery.jsx');
var posts = require('./views/app/posts.jsx');
var blogs = require('./views/app/blogs.jsx');
var blog = require('./views/app/blog.jsx');



/* EXTRA PAGES */
var login = require('./views/app/login.jsx');
var signup = require('./views/app/signup.jsx');
var lock = require('./views/app/lock.jsx');
var users = require('./views/app/users.jsx');


/* ROUTES */
module.exports = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={posts}/>
    <Route path='/' handler={posts}/>
    <Route path='/gallery' handler={gallery} />
    <Route path='/posts' handler={posts} />
    <Route path='/blogs' handler={blogs} />
    <Route path='/blog' handler={blog} />
    <Route path='/login' handler={login} />
    <Route path='/signup' handler={signup} />
    <Route path='/lock' handler={lock} />
    <Route path='/users' handler={users} />
    <NotFoundRoute handler={notfound} />

  </Route>
);
