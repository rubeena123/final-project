var UserController = require('./controllers/userController');
var User = require('./models/userModel')
module.exports = (app) => {

  // middleware function!
  var checkIfLoggedIn = function (req, res, next) {
    if (req.session.uid) {
        console.info('User is logged in, proceeding to dashboard...'.green);
        next();
    } else {
        console.warn('User is not logged in!'.yellow)
        res.redirect('/auth.html');
    }
  }

  app.get('/api/user', UserController.getUsers)
  app.post('/api/user/:id', UserController.updateUser)

  app.post('/register', UserController.registerUser);   // register form submission


  app.post('/login', UserController.loginUser);         // login form submission

  app.get('/me', function(req, res){
//     res.send(req.session);
    User.findOne({_id : req.session.uid}, function(err, user){
      res.send(user)
    })

  });

  // This route should only be available if someone is logged in
  app.get('/dashboard', checkIfLoggedIn, function (req, res) {
      res.send('the home page')
  });


  app.get('/logout', function (req, res) {
      req.session.reset(); // clears the users cookie session
      res.redirect('/auth.html');
  });
}
