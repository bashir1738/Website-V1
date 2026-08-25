const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { newsletterSchema } = require('../schemas');

router.post('/', validate(newsletterSchema), newsletterController.subscribe);
router.get('/', authMiddleware, newsletterController.getAll);

module.exports = router;
