const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { sponsorSchema } = require('../schemas');

router.post('/', validate(sponsorSchema), sponsorController.submit);
router.get('/', authMiddleware, sponsorController.getAll);

module.exports = router;
