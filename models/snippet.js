const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  notes: [String],
  language: {type: String, required: true},
  tags: [String],
  userId: mongoose.Schema.Types.ObjectId
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;
