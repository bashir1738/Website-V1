const express = require('express');
const router = express.Router();
const hireController = require('../controllers/hireController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { hireSchema } = require('../schemas');

router.post('/', validate(hireSchema), hireController.submit);
router.get('/', authMiddleware, hireController.getAll);

module.exports = router;
