const express = require('express');
const router = express.Router();
const hireController = require('../controllers/hireController');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { hireSchema } = require('../schemas');
const { HireRequest } = require('../models');

const status = statusController(HireRequest, 'Hire request');

router.post('/', validate(hireSchema), hireController.submit);
router.get('/', authMiddleware, hireController.getAll);
router.patch('/:id', authMiddleware, status.updateStatus);

router.delete('/:id', authMiddleware, hireController.remove);

module.exports = router;
