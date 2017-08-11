const User = require('../models/user.js');
const helpers = require('../helpers/helpers.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  createUser: function(username, password){
      return User.create({username: username, password: helpers.createPasswordHashObject(password)});
    },
  login: function(username, password){
    return User.findOne({username: username}).then(function(user){
  if(!user){
    return false;
  }
  const pwObject = user.password;
  const newPwObject = helpers.createPasswordHashObject(password, pwObject.salt);
  return pwObject.hash === newPwObject.hash;
    });
  }

















};
