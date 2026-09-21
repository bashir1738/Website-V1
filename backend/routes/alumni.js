const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { alumniSchema } = require('../schemas');
const { AlumniProfile } = require('../models');

const status = statusController(AlumniProfile, 'Alumni profile');

router.post('/', upload.single('photo'), validate(alumniSchema), alumniController.submit);
router.get('/public', alumniController.getPublic);
router.get('/', authMiddleware, alumniController.getAll);
router.patch('/:id', authMiddleware, status.updateStatus);

router.delete('/:id', authMiddleware, alumniController.remove);

module.exports = router;