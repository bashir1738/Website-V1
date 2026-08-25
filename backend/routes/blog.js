const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { blogSchema } = require('../schemas');

router.get('/', blogController.getAll);
router.get('/:slug', blogController.getBySlug);
router.post('/', authMiddleware, upload.single('image'), validate(blogSchema), blogController.create);
router.put('/:id', authMiddleware, upload.single('image'), blogController.update);
router.delete('/:id', authMiddleware, blogController.remove);

module.exports = router;
