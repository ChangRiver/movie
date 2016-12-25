var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req, res, next) {
  var _user = req.body.user;

  User.find({name: _user.name}, function(err, user) {
    if(err) {
      console.log(err);
    }

    if(user) {
      return res.redirect('/');
    } else {
      var user = new User(_user);

      user.save(function(err, user) {
        if(err) console.log(err);

        res.redirect('/admin/userlist');
      })
    }
  });
});

module.exports = router;
