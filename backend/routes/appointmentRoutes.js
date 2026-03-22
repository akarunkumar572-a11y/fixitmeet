const express = require('express');
const router = express.Router();
const { getAppointments, createAppointment, updateAppointmentStatus, getAppointmentById } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getAppointments) // Both patients and doctors use this, controller handles logic
    .post(protect, createAppointment); // Patients book here

router.route('/:id')
    .get(protect, getAppointmentById)
    .put(protect, updateAppointmentStatus);

module.exports = router;
