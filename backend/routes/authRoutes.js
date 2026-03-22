const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateMe, requestOtp, verifyOtp } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/otp/request', requestOtp);
router.post('/otp/verify', verifyOtp);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateMe); // allow logged in user to modify own profile

module.exports = router;
