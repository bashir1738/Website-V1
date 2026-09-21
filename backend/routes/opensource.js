const express = require('express');
const router = express.Router();
const opensourceController = require('../controllers/opensourceController');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { opensourceSchema } = require('../schemas');
const { OpenSourceApplication } = require('../models');

const status = statusController(OpenSourceApplication, 'Open source application');

router.post('/', validate(opensourceSchema), opensourceController.submit);
router.get('/', authMiddleware, opensourceController.getAll);
router.patch('/:id', authMiddleware, status.updateStatus);

router.delete('/:id', authMiddleware, opensourceController.remove);

module.exports = router;
