const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validateMiddleware');
const { contactSchema } = require('../schemas');

router.post('/', submissionLimiter, validate(contactSchema), contactController.submit);
router.get('/', authMiddleware, contactController.getAll);
router.put('/:id', authMiddleware, validate(contactSchema), contactController.update);
router.delete('/:id', authMiddleware, contactController.remove);

module.exports = router;
