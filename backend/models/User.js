const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial'
  }],
  quizScores: [{
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
