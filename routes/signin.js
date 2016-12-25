var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req, res, next) {
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;

  User.findOne({name: name}, function(err, user) {
    if(err) {
      console.log(err);
    }

    if(!user) {
      return res.redirect('/');
    }

    user.comparePassword(password, function(err, isMatch) {
      if(err) {
        console.log(err);
      }

      if(isMatch) {
        req.session.user = user;

        return res.redirect('/');
      } else {
        console.log('password is not match');
      }
    })
  })
});

module.exports = router;