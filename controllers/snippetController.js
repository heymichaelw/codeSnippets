const Snippet = require('../models/snippet');
const bodyParser = require('body-parser');

module.exports = {
  snippetList: function(req, res){
    res.render('index');
  },
  createSnippetPage: function(req, res){
    res.render('createSnippet');
  },
  createSnippet: function(req, res){
    var tags = req.body.tags;
    var tagsArray = tags.split(' ');
    var notes = req.body.notes;
    var notesArray = notes.split(',');
    var snippet = new Snippet({
      title: req.body.title,
      body: req.body.body,
      notes: notesArray,
      language: req.body.language,
      tags: tagsArray,
      userId: req.session.userId
    });
    snippet.save().then(function(snippet){
      console.log(snippet);
      res.redirect('/');
    });
  }
};
