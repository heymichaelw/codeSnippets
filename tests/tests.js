const expect = require('chai').expect;
const request = require('supertest');
const app = require("../app");
const User = require('../models/user');
const Snippet = require('../models/snippet');
const userController = require('../controllers/userController.js');
const helpers = require('../helpers/helpers.js');

describe("snippet model tests", function(){

  afterEach(function(done){
    Snippet.deleteMany({}).then(function(){
      done();
    });
  });

  beforeEach(function(done){
    Snippet.deleteMany({}).then(function(){
      done();
    });
  });

  it("can create a snippet", function(done){
    var snippet = new Snippet({title: 'test snippet', body: 'this is a test body', notes: ['new test', 'string'], language: 'Java', tags: ['java', 'test'], userId: "599349bd1d836770c38db57b"}).save().then(function(snippet){
      expect(snippet.title).to.equal('test snippet');
    });
    done();
  });
});

describe("user model tests", function(){

  afterEach(function(done){
    User.deleteMany({}).then(function(){
      done();
    });
  });

  it("can create a user", function(done){
    helpers.createUser("username", "password").then(function(user){
      expect(user.username).to.equal("username");
      expect(user.password).to.be.an("object");
      expect(user.password.hash.length).to.equal(344);
    });
    done();
  });

  it('can log in and return true if valid login', function(done){
    helpers.createUser("michael", "fredmoo").then(function(user){
      helpers.login("michael", "fredmoo").then(function(result){
        expect(result).to.equal(true);
        done();
      });
    });
  });

  it('will not login if invalid password', function(done){
    helpers.createUser("michael", "fredmoo").then(function(user){
      helpers.login("michael", "kaminsky").then(function(result){
        expect(result).to.equal(false);
        done();
      });
    });
  });

  it('will not login if invalid username', function(done){
    helpers.createUser("michael", "fredmoo").then(function(user){
      helpers.login("tommy", "fredmoo").then(function(result){
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
