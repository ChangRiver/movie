var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

router.get('/', function (req, res, next) {
  var id = req.params.id;

  if (id) {
    Movie.findById(id, function (err, movie) {
      res.render('admin', {
        title: 'imooc 后台更新页',
        movie: movie
      })
    })
  }
})

module.exports = router;
