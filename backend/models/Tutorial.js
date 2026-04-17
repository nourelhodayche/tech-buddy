const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  level: { type: String, default: 'Beginner' },
  category: { type: String, required: true }
});

module.exports = mongoose.model('Tutorial', tutorialSchema);