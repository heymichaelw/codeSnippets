const crypto = require('crypto');
const User = require('../models/user.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');



const createUser = function(username, password){
      return User.create({username: username, password: createPasswordHashObject(password)});
    };
const createPasswordHashObject = function(password, salt=""){
    salt = salt || crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, 8);
    const hash = crypto.pbkdf2Sync(password, salt, 100, 256, 'sha256');
    const hashString = hash.toString("base64");
    return {salt: salt, iterations: 100, hash: hashString};
  };
const login = function(username, password){
    return User.findOne({username: username}).then(function(user){
  if(!user){
    return false;
  }
  const pwObject = user.password;
  const newPwObject = createPasswordHashObject(password, pwObject.salt);
  return pwObject.hash === newPwObject.hash;
    });
  };

module.exports = {
  createUser: createUser,
  createPasswordHashObject: createPasswordHashObject,
  login: login
};
