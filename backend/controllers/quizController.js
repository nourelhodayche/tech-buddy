const Quiz = require('../models/Quiz');

// Get all quiz questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

module.exports = { getQuestions };