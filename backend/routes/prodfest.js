const express = require('express');
const router = express.Router();
const prodfestController = require('../controllers/prodfestController');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { prodfestSchema } = require('../schemas');
const { ProdfestRegistration } = require('../models');

const status = statusController(ProdfestRegistration, 'ProdFest registration');

router.post('/', validate(prodfestSchema), prodfestController.submit);
router.get('/', authMiddleware, prodfestController.getAll);
router.patch('/:id', authMiddleware, status.updateStatus);

router.delete('/:id', authMiddleware, prodfestController.remove);

module.exports = router;
