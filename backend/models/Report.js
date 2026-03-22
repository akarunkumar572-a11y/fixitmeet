const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: String // name of provider who uploaded or issued
    },
    name: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String
    },
    fileSize: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);