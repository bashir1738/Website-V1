const express = require('express');
const router = express.Router();
const paymentAdminController = require('../controllers/paymentAdminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin-only payment verification dashboard. All routes require an admin
// session (HttpOnly JWT cookie set at /api/auth/login).
router.get('/', authMiddleware, paymentAdminController.list);
router.patch('/:id/approve', authMiddleware, paymentAdminController.approve);
router.patch('/:id/reject', authMiddleware, paymentAdminController.reject);

module.exports = router;