const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { eventSchema, eventUpdateSchema } = require('../schemas');

router.get('/', eventController.getAll);
router.get('/:slug', eventController.getBySlug);
router.post('/', authMiddleware, upload.single('image'), validate(eventSchema), eventController.create);
router.put('/:id', authMiddleware, upload.single('image'), validate(eventUpdateSchema), eventController.update);
router.patch('/:id', authMiddleware, upload.single('image'), validate(eventUpdateSchema), eventController.update);
router.delete('/:id', authMiddleware, eventController.remove);

module.exports = router;
