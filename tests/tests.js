const expect = require('chai').expect;
const request = require('supertest');
const app = require("../app");
const User = require('../models/user');
const Snippet = require('../models/snippet');
const userController = require('../controllers/userController.js');

describe("user model tests", function(){
  it("can create a user", function(done){
    userController.createUser("username", "password").then(function(user){
      expect(user.username).to.equal("username");
      expect(user.password).to.be.an("object");
      expect(user.password.hash.length).to.equal(344);
    });
    done();
  });
});

describe("sanity test", function(){
   it("should run test", function(){
     expect(1).to.not.equal(2);
   });
});
