var _ = require('underscore');
var Movie = require('../models/movie');

module.exports = function (app) {

  app.use(function(req, res, next) {
    var _user = req.session.user;

    if(_user) {
      app.locals.user = _user;
    }

    return next();
  });


  app.get('/', function (req, res) {
    // console.log('user in session ',req.session.user);

    Movie.fetch(function (err, movies) {
      if (err) {
        console.log(err)
      }

      res.render('index', {
        title: 'Star Movie',
        movies: movies
      });
    });
  });

  app.post('/admin/movie/new', function (req, res) {
    var movieObj = req.body.movie;
    console.log(movieObj);
    var id = req.body.movie._id;
    var _movie;
    console.log('id ', id);
    // console.log(id);
    if (id !== 'undefined') {
      Movie.findById(id, function (err, movie) {
        if (err) {
          console.log(err);
        }

        _movie = _.extend(movie, movieObj);
        _movie.save(function (err, movie) {
          if (err) {
            console.log(err);
          }

          res.redirect('/detail/' + movie._id)
        })
      })
    } else {
      _movie = new Movie({
        doctor: movieObj.doctor,
        title: movieObj.title,
        country: movieObj.country,
        language: movieObj.language,
        year: movieObj.year,
        poster: movieObj.poster,
        summary: movieObj.summary,
        flash: movieObj.flash
      });

      _movie.save(function (err, movie) {
        if (err) {
          console.log(err);
        }

        res.redirect('/detail/' + movie._id)
      })
    }
  });


  app.get('/detail/:id', function (req, res) {
    var id = req.params.id;

    if (id) {
      Movie.findById(id, function (err, movie) {
        res.render('detail', {
          title: movie.title,
          movie: movie
        })
      })
    }
  });

  app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;

    if (id) {
      Movie.findById(id, function (err, movie) {
        res.render('admin', {
          title: 'imooc 后台更新页',
          movie: movie
        })
      })
    }
  });

  // list delete movie
  app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    console.log('delete id ', id);
    if (id) {
      Movie.remove({_id: id}, function (err, movie) {
        if (err) {
          console.log(err);
        } else {
          res.json({success: 1})
        }
      })
    }
  });

  // logout
  app.get('/logout', function(req, res) {
    delete req.session.user;
    delete app.locals.user;
    res.redirect('/');
  });

  // 列表页
  app.use('/admin/list', require('./admin-list'));

  // 后台录入页
  app.use('/admin/movie', require('./admin-movie'));

  // 注册
  app.use('/user/signup', require('./signup'));

  // 登录
  app.use('/user/signin', require('./signin'));

  // 用户列表页
  app.use('/admin/userlist', require('./userlist'));

  // TODO
  // admin post movie
  // app.use('/admin/movie/new', require('./admin-movie-post'))

  // 详情页
  // app.use('/detail/:id', require('./detail'));

  // admin update movie
  // app.use('/admin/update/:id', require('./update-movie'));

};