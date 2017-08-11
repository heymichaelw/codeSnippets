const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Snippet = require('./models/snippet');
const routes = require('./router.js');
const parseurl = require('parseurl');
mongoose.Promise = require('bluebird');
const expressValidator = require('express-validator');
const session = require('express-session');
const mustache = require('mustache-express');
const app = express();

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config.json")[nodeEnv];

app.use(bodyParser.json());
mongoose.connect(config.mongoURL);

app.engine('mustache', mustache());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.set('layout', 'layout');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  additionalVaidators: 'equals'
}));

routes(app);

app.listen(3000);

module.exports = app;
