const mongoose = require('mongoose');

const aiMemorySchema = new mongoose.Schema({
    user: {
        type: String, // Store PostgreSQL UUID as a string
        required: true,
        unique: true
    },
    preferences: {
        type: String, // Store aggregated preferences/notes for AI context
        default: ''
    },
    chatHistory: [{
        role: { type: String, enum: ['user', 'assistant', 'system'] },
        content: { type: String },
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('AiMemory', aiMemorySchema);
