const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { alumniSchema } = require('../schemas');

router.post('/', upload.single('photo'), validate(alumniSchema), alumniController.submit);
router.get('/', authMiddleware, alumniController.getAll);

router.delete('/:id', authMiddleware, alumniController.remove);

module.exports = router;
