const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { loginLimiter } = require('../middlewares/rateLimiter');
const { loginSchema } = require('../schemas');

// HIGH-2: loginLimiter caps login attempts at 5 per 15 min per IP.
router.post('/login', loginLimiter, validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me);

module.exports = router;
