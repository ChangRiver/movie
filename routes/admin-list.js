var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

router.get('/', function (req, res, next) {
  Movie.fetch(function (err, movies) {
    if (err) {
      console.log(err);
    }

    res.render('list', {
      title: 'imooc 列表页',
      movies: movies
    })

  })
});

module.exports = router;