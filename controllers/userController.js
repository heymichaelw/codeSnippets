const User = require('../models/user.js');
const helpers = require('../helpers/helpers.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  createUser: function(username, password){
      return User.create({username: username, password: helpers.createPasswordHashObject(password)});
    }
};
