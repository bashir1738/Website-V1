const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { sponsorSchema } = require('../schemas');
const { Sponsorship } = require('../models');

const status = statusController(Sponsorship, 'Sponsorship');

router.post('/', validate(sponsorSchema), sponsorController.submit);
router.get('/', authMiddleware, sponsorController.getAll);
router.patch('/:id', authMiddleware, status.updateStatus);

router.delete('/:id', authMiddleware, sponsorController.remove);

module.exports = router;
