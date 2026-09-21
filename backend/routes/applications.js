const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { applicationSchema } = require('../schemas');
const { ProgramApplication } = require('../models');

const status = statusController(ProgramApplication, 'Application');

router.post('/', upload.single('resume'), validate(applicationSchema), applicationController.submit);
router.get('/', authMiddleware, applicationController.getAll);
router.patch('/:id', authMiddleware, status.updateStatus);

router.delete('/:id', authMiddleware, applicationController.remove);

module.exports = router;
