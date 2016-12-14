var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');

router.get('/', function (req, res, next) {
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
})

// router.post('/new', function(req, res, next) {
// 		var movieObj = req.body.movie;
// 		// console.log(movieObj);
// 		var id = req.body.movie._id;
// 		var _movie;
//         // console.log('id ',id);
// 		if(id !== 'undefined') {
//           Movie.findById(id, function(err, movie) {
//           	if(err) {
//           		console.log(err);
//           	}

//           	_movie = _.extend(movie, movieObj);
//           	_movie.save(function(err, movie) {
//           		if(err) {
//           			console.log(err);
//           		}

//           		res.redirect('/detail/' + movie._id)
//           	})
//           }) 
// 		} else {
// 			_movie = new Movie({
// 				doctor: movieObj.doctor,
// 				title: movieObj.title,
// 				country: movieObj.country,
// 				language: movieObj.language,
// 				year: movieObj.year,
// 				poster: movieObj.poster,
// 				summary: movieObj.summary,
// 				flash: movieObj.flash,
// 			})

// 			_movie.save(function(err, movie) {
//           		if(err) {
//           			console.log(err);
//           		}

//           		res.redirect('/detail/' + movie._id)
//           	})
// 		}	
// })

module.exports = router;