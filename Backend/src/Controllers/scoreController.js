// controllers/scoreController.js
const Score = require('../Models/scoreModel');

// Controller to create or update score
const createOrUpdateScore = async (req, res) => {
  try {
    const { userId, score } = req.body;

    // Ensure userId and score are provided
    if (!userId || score === undefined) {
      return res.status(400).json({ message: 'userId and score are required' });
    }

    // Find if a score record already exists for the user
    let existingScore = await Score.findOne({ userId });

    if (existingScore) {
      // If score exists, update it
      existingScore.score = score;
      await existingScore.save();
      return res.status(200).json({ message: 'Score updated successfully', score: existingScore });
    } else {
      // If no score exists, create a new one
      const newScore = new Score({ userId, score });
      await newScore.save();
      return res.status(201).json({ message: 'Score created successfully', score: newScore });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrUpdateScore,
};
