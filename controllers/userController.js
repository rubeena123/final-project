var User = require('../models/userModel');
var bcrypt = require('bcryptjs');

module.exports = {
getUsers:(req,res)=>{
User.find({},(err,users)=>{
res.send(users);

})

},

  registerUser: (req, res) => {
    console.info('Register payload:', req.body);

    var newUser = new User(req.body);

    newUser.save(function(err, user) {
      if (err) {
        console.log('Could not save new user :(', err);
        res.status(500).send("Failed to save user");
      } else {
        console.log('New user created in MongoDB:', user);
        req.session.uid = user._id; // this is what keeps our user session on the back end!
        res.send(user); // send a success message
      }
    });
  },


  loginUser : (req, res) => { // form post submission
      console.info('auth.login.payload:', req.body);

      User.findOne({ username: req.body.username }, function (err, user) {
          if (err) {
              console.log('MongoDB error:'.red, err);
              res.status(500).send("failed to find user")
          }
          else if (!user) {
              // forbidden
              console.log('No user found!');
              res.status(403).send("No user found");
          } else {
              console.log('auth.login.user', user);
              // at this point, user.password is hashed!
              bcrypt.compare(req.body.password, user.password, function (bcryptErr, matched) {
                  // matched will be === true || false
                  if (bcryptErr) {
                      console.error('MongoDB error:', bcryptErr);
                      res.status(500).send("mongodb error");
                  } else if (!matched) {
                      // forbidden, bad password
                      console.warn('Password did not match!');
                      res.status(403).send("failed to log in");
                  } else {
                      req.session.uid = user._id; // this is what keeps our user session on the back end!
                      res.send(user); // send a success message
                  };


              });
          }
      });
  },

  updateUser : (req, res) =>{
    console.log('login.user',req.body)

    User.update({_id : req.params.id}, req.body, (err, update)=>{
      res.send (true);

  })

  },
}
