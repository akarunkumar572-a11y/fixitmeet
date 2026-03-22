const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../../middleware/authMiddleware');
const { getReports, uploadReport, downloadReport } = require('../../controllers/healthcare/reportController');

// configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/reports'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/', protect, getReports);
router.post('/', protect, upload.single('file'), uploadReport);
router.get('/:id/download', protect, downloadReport);

module.exports = router;