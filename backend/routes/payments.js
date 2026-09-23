const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { submissionLimiter } = require('../middlewares/rateLimiter');

// The browser confirms the popup result here. Rate-limited like other
// public write endpoints.
router.post('/verify', submissionLimiter, paymentController.verify);

// Paystack webhook. Raw-body parsing is mounted at app level BEFORE
// express.json() so the HMAC signature can be checked against the exact bytes.
router.post('/webhook', paymentController.webhook);

module.exports = router;