const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const upload = require('../middlewares/uploadMiddleware');

// Applicant-facing payment endpoints. `token` is the opaque status_token
// issued at application time (in the multipart body / URL path).
router.post('/upload', upload.single('proof'), paymentController.submit);
router.get('/status/:token', paymentController.status);

module.exports = router;