const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');
const { loginSchema } = require('../schemas');

router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
