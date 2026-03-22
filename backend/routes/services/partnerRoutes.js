const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitPartner, listPartners, updatePartner } = require('../../controllers/services/partnerController');
const { protect, admin } = require('../../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads/partners'));
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/', upload.single('idProof'), submitPartner);

// admin endpoints
router.get('/', protect, admin, listPartners);
router.put('/:id', protect, admin, updatePartner);

module.exports = router;