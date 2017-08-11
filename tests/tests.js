const expect = require('chai').expect;
const request = require('supertest');
const app = require("../app");
const User = require('../models/user');
const Snippet = require('../models/snippet');

describe("sanity test", function(){
   it("should run test", function(){
     expect(1).to.not.equal(2);
   });
});
