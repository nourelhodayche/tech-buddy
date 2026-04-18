const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_tech_buddy_key'; // We'll add this to .env later

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Veuillez fournir un nom d'utilisateur et un mot de passe." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Ce nom d'utilisateur existe déjà." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        favorites: user.favorites,
        quizScores: user.quizScores
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription.", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Veuillez fournir un nom d'utilisateur et un mot de passe." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        favorites: user.favorites,
        quizScores: user.quizScores
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = { register, login, getMe };
