module.exports = {
  signinRequired: function (req, res, next) {
    var user = req.session.user;

    if(!user) {
      // return 不让流程往下走
      return res.redirect('/signin');
    }

    next();
  },
  adminRequired: function(req, res, next) {
    var user = req.session.user;
    // 判断用户权限
    if(user.role <= 10) {
      return res.redirect('/signin')
    }

    next();
  }
};