var _ = require('underscore');
var Movie = require('../models/movie');
var Comment = require('../models/comment');

// detail page
exports.detail = function(req, res) {
  var id = req.params.id;

  if (id) {
    Movie.findById(id, function (err, movie) {
       Comment
         .find({movie: id})
         .populate('from', 'name')
         .exec(function (err, comments) {
           res.render('detail', {
             title: movie.title,
             movie: movie,
             comments: comments
           })
         })
    })
  }
};

// admin new page
exports.new = function(req, res) {
  res.render('admin', {
    title: '后台电影录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
};

// admin update page
exports.update = function (req, res) {
  var id = req.params.id;

  if (id) {
    Movie.findById(id, function (err, movie) {
      res.render('admin', {
        title: 'imooc 后台更新页',
        movie: movie
      })
    })
  }
};

// admin post movie
exports.save = function(req, res) {
  var movieObj = req.body.movie;
  var id = req.body.movie._id;
  var _movie;

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
};

// list page
exports.list = function(req, res) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }

    res.render('list', {
      title: 'imooc 列表页',
      movies: movies
    })

  })
};

// delete movie
exports.del = function(req, res) {
  var id = req.query.id;
  // console.log('delete id ', id);
  if (id) {
    Movie.remove({_id: id}, function (err, movie) {
      if (err) {
        console.log(err);
      } else {
        res.json({success: 1})
      }
    })
  }
};