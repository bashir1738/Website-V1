const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { contactSchema } = require('../schemas');
const { ContactMessage } = require('../models');

const status = statusController(ContactMessage, 'Contact');

router.post('/', validate(contactSchema), contactController.submit);
router.get('/', authMiddleware, contactController.getAll);
router.patch('/:id', authMiddleware, status.updateStatus);

router.delete('/:id', authMiddleware, contactController.remove);

module.exports = router;
