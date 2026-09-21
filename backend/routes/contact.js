const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { contactSchema } = require('../schemas');

router.post('/', validate(contactSchema), contactController.submit);
router.get('/', authMiddleware, contactController.getAll);

router.delete('/:id', authMiddleware, contactController.remove);

module.exports = router;
