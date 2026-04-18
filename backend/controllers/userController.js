const User = require('../models/User');

const toggleFavorite = async (req, res) => {
  try {
    const tutorialId = req.params.tutorialId;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const isFavorited = user.favorites.includes(tutorialId);

    if (isFavorited) {
      // Remove
      user.favorites = user.favorites.filter(id => id.toString() !== tutorialId);
    } else {
      // Add
      user.favorites.push(tutorialId);
    }

    await user.save();
    
    // Return updated user
    const updatedUser = await User.findById(userId).select('-password').populate('favorites');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification des favoris', error: error.message });
  }
};

const saveQuizScore = async (req, res) => {
  try {
    const { score, total } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.quizScores.push({ score, total });
    await user.save();

    const updatedUser = await User.findById(userId).select('-password').populate('favorites');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la sauvegarde du score', error: error.message });
  }
};

module.exports = { toggleFavorite, saveQuizScore };
