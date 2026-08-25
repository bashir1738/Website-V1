const express = require('express');
const router = express.Router();
const opensourceController = require('../controllers/opensourceController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { opensourceSchema } = require('../schemas');

router.post('/', validate(opensourceSchema), opensourceController.submit);
router.get('/', authMiddleware, opensourceController.getAll);

module.exports = router;
