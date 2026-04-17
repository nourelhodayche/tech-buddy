const Tutorial = require('../models/Tutorial');

// Get all tutorials
const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutorials' });
  }
};

// Get single tutorial by ID
const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }
    res.json(tutorial);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutorial' });
  }
};

module.exports = { getTutorials, getTutorialById };