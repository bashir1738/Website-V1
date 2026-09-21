const express = require('express');
const router = express.Router();
const prodfestController = require('../controllers/prodfestController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { prodfestSchema } = require('../schemas');

router.post('/', validate(prodfestSchema), prodfestController.submit);
router.get('/', authMiddleware, prodfestController.getAll);

router.delete('/:id', authMiddleware, prodfestController.remove);

module.exports = router;
