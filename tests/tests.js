const expect = require('chai').expect;
const request = require('supertest');
const app = require("../app");
const User = require('../models/user');
const Snippet = require('../models/snippet');
const userController = require('../controllers/userController.js');

describe("user model tests", function(){

  afterEach(function(done){
    User.deleteMany({}).then(function(){
      done();
    });
  });

  it("can create a user", function(done){
    userController.createUser("username", "password").then(function(user){
      expect(user.username).to.equal("username");
      expect(user.password).to.be.an("object");
      expect(user.password.hash.length).to.equal(344);
    });
    done();
  });

  it('can log in and return true if valid login', function(done){
    userController.createUser("michael", "fredmoo").then(function(user){
      userController.login("michael", "fredmoo").then(function(result){
        expect(result).to.equal(true);
        done();
      });
    });
  });

  it('will not login if invalid password', function(done){
    userController.createUser("michael", "fredmoo").then(function(user){
      userController.login("michael", "kaminsky").then(function(result){
        expect(result).to.equal(false);
        done();
      });
    });
  });

  it('will not login if invalid username', function(done){
    userController.createUser("michael", "fredmoo").then(function(user){
      userController.login("tommy", "fredmoo").then(function(result){
        expect(result).to.equal(false);
        done();
      });
    });
  });

});



describe("sanity test", function(){
   it("should run test", function(){
     expect(1).to.not.equal(2);
   });
});
