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

/* Controllers */
var post_controller = require('./controllers/post_controller');


/* ROUTES */
module.exports = (
  <Route handler={ReactRouter.RouteHandler}>
    <DefaultRoute handler={posts} />
    <Route path='/' handler={posts} />
    <Route path='/gallery' handler={gallery} />
    <Route path='/post/list' handler={posts} />
    <Route path='/blog/list' handler={blogs} />
    <Route path='/blog' handler={blog} />
    <Route path='/login' handler={login} />
    <Route path='/signup' handler={signup} />
    <Route path='/lock' handler={lock} />
    <NotFoundRoute handler={notfound} />

    <Route path='/post/create' handler={post_controller.create} />
  </Route>
);
