const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { submissionLimiter } = require('../middlewares/rateLimiter');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { applicationSchema } = require('../schemas');

router.post('/', submissionLimiter, upload.single('resume'), validate(applicationSchema), applicationController.submit);
router.get('/', authMiddleware, applicationController.getAll);
router.put('/:id', authMiddleware, upload.single('resume'), validate(applicationSchema), applicationController.update);
router.delete('/:id', authMiddleware, applicationController.remove);

module.exports = router;
