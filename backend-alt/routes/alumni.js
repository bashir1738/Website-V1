const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const authMiddleware = require('../middlewares/authMiddleware');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { alumniSchema, alumniUpdateSchema } = require('../schemas');

router.post('/', submissionLimiter, upload.single('photo'), validate(alumniSchema), alumniController.submit);
router.get('/', authMiddleware, alumniController.getAll);
router.put('/:id', authMiddleware, upload.single('photo'), validate(alumniUpdateSchema), alumniController.update);
router.patch('/:id', authMiddleware, upload.single('photo'), validate(alumniUpdateSchema), alumniController.update);
router.delete('/:id', authMiddleware, alumniController.remove);

module.exports = router;
