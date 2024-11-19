const express = require('express');
const {registerUser, loginUser} = require('../Controllers/authController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);



//protected route path for user
router.get("/auth-user", authMiddleware, (req, res) => {
    res.status(200).send({ ok: true });
  });




module.exports = router;