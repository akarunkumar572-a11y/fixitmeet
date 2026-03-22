const express = require('express');
const router = express.Router();
const { getServices, getServiceById, createService, updateService, deleteService } = require('../../controllers/services/serviceController');
const { protect, admin } = require('../../middleware/authMiddleware');

router.route('/')
    .get(getServices)
    .post(protect, admin, createService); // Only Admin can create

// public single service lookup; admin update/delete
router.route('/:id')
    .get(getServiceById)
    .put(protect, admin, updateService)
    .delete(protect, admin, deleteService);

module.exports = router;
