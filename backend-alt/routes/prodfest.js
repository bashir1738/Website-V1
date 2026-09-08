const express = require('express');
const router = express.Router();
const prodfestController = require('../controllers/prodfestController');
const authMiddleware = require('../middlewares/authMiddleware');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validateMiddleware');
const { prodfestSchema, prodfestUpdateSchema } = require('../schemas');

router.post('/', submissionLimiter, validate(prodfestSchema), prodfestController.submit);
router.get('/', authMiddleware, prodfestController.getAll);
router.put('/:id', authMiddleware, validate(prodfestUpdateSchema), prodfestController.update);
router.patch('/:id', authMiddleware, validate(prodfestUpdateSchema), prodfestController.update);
router.delete('/:id', authMiddleware, prodfestController.remove);

module.exports = router;
