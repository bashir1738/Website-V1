const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validateMiddleware');
const { loginSchema } = require('../schemas');

router.post('/login', authLimiter, validate(loginSchema), authController.login);

module.exports = router;
