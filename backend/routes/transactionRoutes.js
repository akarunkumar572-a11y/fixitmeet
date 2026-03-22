const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getTransactions, createTransaction } = require('../controllers/transactionController');

router.get('/', protect, getTransactions);
router.post('/', protect, createTransaction);

module.exports = router;