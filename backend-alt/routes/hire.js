const express = require('express');
const router = express.Router();
const hireController = require('../controllers/hireController');
const authMiddleware = require('../middlewares/authMiddleware');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const validate = require('../middlewares/validateMiddleware');
const { hireSchema, hireUpdateSchema } = require('../schemas');

router.post('/', submissionLimiter, validate(hireSchema), hireController.submit);
router.get('/', authMiddleware, hireController.getAll);
router.put('/:id', authMiddleware, validate(hireUpdateSchema), hireController.update);
router.patch('/:id', authMiddleware, validate(hireUpdateSchema), hireController.update);
router.delete('/:id', authMiddleware, hireController.remove);

module.exports = router;
