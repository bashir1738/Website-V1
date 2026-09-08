const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const authMiddleware = require('../middlewares/authMiddleware');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validateMiddleware');
const { newsletterSchema, newsletterUpdateSchema } = require('../schemas');

router.post('/', submissionLimiter, validate(newsletterSchema), newsletterController.subscribe);
router.get('/', authMiddleware, newsletterController.getAll);
router.put('/:id', authMiddleware, validate(newsletterUpdateSchema), newsletterController.update);
router.patch('/:id', authMiddleware, validate(newsletterUpdateSchema), newsletterController.update);
router.delete('/:id', authMiddleware, newsletterController.remove);

module.exports = router;
