const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Healthcare', 'Home Services', 'Pest Control', 'Other']
    },
    description: { type: String },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    duration: { type: String }, // e.g., '30 mins', '1 hour'
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
