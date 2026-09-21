const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { newsletterSchema } = require('../schemas');
const { NewsletterSubscriber } = require('../models');

const status = statusController(NewsletterSubscriber, 'Subscriber');

router.post('/', validate(newsletterSchema), newsletterController.subscribe);
router.get('/', authMiddleware, newsletterController.getAll);
router.patch('/:id', authMiddleware, status.updateStatus);

router.delete('/:id', authMiddleware, newsletterController.remove);

module.exports = router;
