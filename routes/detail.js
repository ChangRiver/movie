var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

router.get('/', function (req, res, next) {
  var id = req.params.id;
  // console.log('detail id ',id);

  if (id) {
    Movie.findById(id, function (err, movie) {
      res.render('detail', {
        title: movie.title,
        movie: movie
      })
    })
  }
})

module.exports = router;
