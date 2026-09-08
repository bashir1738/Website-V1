const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const authMiddleware = require('../middlewares/authMiddleware');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validateMiddleware');
const { newsletterSchema } = require('../schemas');

router.post('/', submissionLimiter, validate(newsletterSchema), newsletterController.subscribe);
router.get('/', authMiddleware, newsletterController.getAll);
router.put('/:id', authMiddleware, validate(newsletterSchema), newsletterController.update);
router.delete('/:id', authMiddleware, newsletterController.remove);

module.exports = router;
