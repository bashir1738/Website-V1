const express = require('express');
const router = express.Router();
const opensourceController = require('../controllers/opensourceController');
const authMiddleware = require('../middlewares/authMiddleware');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validateMiddleware');
const { opensourceSchema, opensourceUpdateSchema } = require('../schemas');

router.post('/', submissionLimiter, validate(opensourceSchema), opensourceController.submit);
router.get('/', authMiddleware, opensourceController.getAll);
router.put('/:id', authMiddleware, validate(opensourceUpdateSchema), opensourceController.update);
router.patch('/:id', authMiddleware, validate(opensourceUpdateSchema), opensourceController.update);
router.delete('/:id', authMiddleware, opensourceController.remove);

module.exports = router;
