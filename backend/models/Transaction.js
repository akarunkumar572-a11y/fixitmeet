const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['Deposit', 'Payment', 'Refund'],
        required: true
    },
    method: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Processing', 'Completed', 'Failed'],
        default: 'Processing'
    },
    description: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);