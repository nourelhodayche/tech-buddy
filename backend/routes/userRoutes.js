const express = require('express');
const router = express.Router();
const { toggleFavorite, saveQuizScore } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/favorites/:tutorialId', protect, toggleFavorite);
router.post('/quiz-score', protect, saveQuizScore);

module.exports = router;
