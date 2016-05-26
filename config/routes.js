var Index = require('../app/controllers/index')
// var User = require('../app/controllers/user')

module.exports = function(app) {

  // pre handle user
  // app.use(function(req, res, next) {
  //   var _user = req.session.user

  //   app.locals.user = _user

  //   next()
  // })

  // Index
  app.get('/', Index.index)
  app.get('/home', Index.home)

  // User
  // app.post('/user/signup', User.signup)
  // app.post('/user/signin', User.signin)
  // app.get('/signin', User.showSignin)
  // app.get('/signup', User.showSignup)
  // app.get('/logout', User.logout)
  // app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)
}