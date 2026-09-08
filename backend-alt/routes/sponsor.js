const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');
const authMiddleware = require('../middlewares/authMiddleware');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validateMiddleware');
const { sponsorSchema, sponsorUpdateSchema } = require('../schemas');

router.post('/', submissionLimiter, validate(sponsorSchema), sponsorController.submit);
router.get('/', authMiddleware, sponsorController.getAll);
router.put('/:id', authMiddleware, validate(sponsorUpdateSchema), sponsorController.update);
router.patch('/:id', authMiddleware, validate(sponsorUpdateSchema), sponsorController.update);
router.delete('/:id', authMiddleware, sponsorController.remove);

module.exports = router;
