// src/Routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const { createOrUpdateScore } = require('../Controllers/scoreController');
const authMiddleware = require('../middleware/authMiddleware');

// POST route to create or update score
router.post('/', createOrUpdateScore); // Use /api/score as the base path, no need for "score" in the route path

module.exports = router;
