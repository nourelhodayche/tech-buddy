const express = require('express');
const router = express.Router();
const { getQuestions } = require('../controllers/quizController');

router.get('/', getQuestions);

module.exports = router;