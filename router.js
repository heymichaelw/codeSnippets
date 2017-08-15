const express = require('express');
const snippetController = require('./controllers/snippetController');
const userController = require('./controllers/userController');

const router = express.Router();

module.exports = function(app){

  app.get("/", snippetController.snippetList);
  app.get("/user/signup", userController.createUserPage);
  app.post("/user/signup", userController.createUser);
  app.get("/user/login", userController.loginPage);
  app.post("/user/login", userController.login);

  app.get("/snippet/create", snippetController.createSnippetPage);
  app.post("/snippet/create", snippetController.createSnippet);

};
