const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    vertical: { type: String },
    specialty: { type: String },
    experience: { type: String },
    idProofPath: { type: String },
    status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('PartnerApplication', partnerSchema);