const User = require('../models/user.js');
const helpers = require('../helpers/helpers.js');
const bodyParser = require('body-parser');


module.exports = {
  createUserPage: function(req, res){
    res.render('signup');
  },
  createUser: function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    helpers.createUser(username, password).then(function(newUser){
      req.session.username = newUser.username;
      req.session.userId = newUser.id;
      res.redirect('/');
    });
  },
  loginPage: function(req, res){
    res.render('login');
  },
  login: function(req, res){
    var context = {};
    User.findOne({username: req.body.username}).then(function(user){
      if (!user) {
        context.error = "Username/Password Not Found";
        res.redirect('/user/login', context);
      }
      var userPass = user.password;
      var passAttempt = helpers.createPasswordHashObject(req.body.password, userPass.salt);

      if (userPass.hash !== passAttempt.hash) {
        context.error = "Incorrect Password";
        res.redirect('/user/login', context);
      } else {
        req.session.username = user.username;
        req.session.userId = user.id;
        res.redirect('/');
      }
    });
  }

};
