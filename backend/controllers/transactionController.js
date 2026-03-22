const asyncHandler = require('express-async-handler');
const { Transaction, User } = require('../config/pg_models');

// @desc    Get transactions for logged-in patient
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
    let whereClause = {};
    if (req.user.role === 'patient') {
        whereClause.userId = req.user.id;
    } else if (req.user.role === 'pro') {
        whereClause.userId = req.user.id;
    }

    const txns = await Transaction.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']]
    });
    res.status(200).json(txns);
});

// @desc    Create a new transaction (patient or system triggered)
// @route   POST /api/transactions
// @access  Private
const createTransaction = asyncHandler(async (req, res) => {
    const { type, method, amount, status, description } = req.body;
    if (!type || !amount) {
        res.status(400);
        throw new Error('Type and amount required');
    }

    const txn = await Transaction.create({
        userId: req.user.id,
        type,
        method,
        amount,
        status: status || 'Processing',
        description
    });
    res.status(201).json(txn);
});

module.exports = { getTransactions, createTransaction };