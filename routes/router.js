var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/Movie');

// 中间件
var signinRequired = require('../middleware/check').signinRequired;
var adminRequired = require('../middleware/check').adminRequired;

module.exports = function (app) {

  app.use(function(req, res, next) {
    var _user = req.session.user;

    app.locals.user = _user;

    next();
  });

  // index
  app.get('/', Index.index);

  // movie
  app.post('/admin/movie/new', signinRequired, adminRequired, Movie.save);
  app.get('/detail/:id', Movie.detail);
  app.get('/admin/update/:id', signinRequired, adminRequired, Movie.update);
  app.delete('/admin/movie/list', signinRequired, adminRequired, Movie.del);
  app.get('/admin/movie/list', signinRequired, adminRequired, Movie.list);
  app.get('/admin/movie/new', signinRequired, adminRequired, Movie.new);


  // User

  app.get('/signin', User.showSignin);
  app.get('/signup', User.showSignup);
  // 注册
  app.post('/user/signup', User.signup);

  // 登录
  app.post('/user/signin', User.signin);

  // 登出
  app.get('/logout', User.logout);

  // 用户列表页
  app.get('/admin/user/list', signinRequired, adminRequired, User.list);

};