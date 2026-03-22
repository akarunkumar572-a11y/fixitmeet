const express = require('express');
const router = express.Router();
const { getAdminStats, getAllUsers, updateUserStatus, getAllBookings, getAllTransactions, getAllReviews, getAllTickets } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getAdminStats);
router.get('/users', protect, admin, getAllUsers);
router.get('/bookings', protect, admin, getAllBookings);
router.get('/payments', protect, admin, getAllTransactions);
router.get('/reviews', protect, admin, getAllReviews);
router.get('/tickets', protect, admin, getAllTickets);
router.put('/users/:id/status', protect, admin, updateUserStatus);

module.exports = router;
