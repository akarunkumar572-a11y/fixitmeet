const asyncHandler = require('express-async-handler');
const { Appointment, User, Service } = require('../config/pg_models');

// @desc    Get all appointments for the logged-in user (patient or doctor)
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
    let whereClause = {};

    // If patient, get their bookings
    if (req.user.role === 'patient') {
        whereClause.patientId = req.user.id;
    }
    // If doctor/pro, get appointments assigned to them
    else if (req.user.role === 'pro') {
        whereClause.doctorId = req.user.id;
    }
    // Admin sees all

    const appointments = await Appointment.findAll({
        where: whereClause,
        include: [
            { model: User, as: 'patient', attributes: ['name', 'email', 'phone'] },
            { model: User, as: 'doctor', attributes: ['name', 'email', 'specialization'] },
            { model: Service, as: 'service' }
        ],
        order: [['date', 'ASC']]
    });

    res.status(200).json(appointments);
});

// @desc    Create new appointment (Book)
// @route   POST /api/appointments
// @access  Private (Patient mostly, but admin can too)
const createAppointment = asyncHandler(async (req, res) => {
    const { doctorId, serviceId, date, timeSlot, notes } = req.body;

    if (!doctorId || !date || !timeSlot) {
        res.status(400);
        throw new Error('Please provide doctor, date and time slot');
    }

    // Verify doctor exists and has role 'pro'
    const doctor = await User.findByPk(doctorId);
    if (!doctor || doctor.role !== 'pro') {
        res.status(400);
        throw new Error('Invalid doctor selected');
    }

    const appointment = await Appointment.create({
        patientId: req.user.id, // Logged in patient
        doctorId,
        serviceId: serviceId || null,
        date,
        timeSlot,
        notes
    });

    const populatedAppointment = await Appointment.findByPk(appointment.id, {
        include: [
            { model: User, as: 'patient', attributes: ['name', 'email', 'phone'] },
            { model: User, as: 'doctor', attributes: ['name', 'specialization'] }
        ]
    });

    res.status(201).json(populatedAppointment);
});

// @desc    Update appointment status (Complete, Cancel)
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
        res.status(404);
        throw new Error('Appointment not found');
    }

    // Check permissions: Patient can cancel their own, Doctor can complete/cancel theirs, Admin can do anything
    if (
        req.user.role !== 'admin' &&
        appointment.patientId !== req.user.id &&
        appointment.doctorId !== req.user.id
    ) {
        res.status(401);
        throw new Error('Not authorized to update this appointment');
    }

    if (status) {
        appointment.status = status;
    }

    await appointment.save();

    const populatedAppointment = await Appointment.findByPk(appointment.id, {
        include: [
            { model: User, as: 'patient', attributes: ['name', 'email'] },
            { model: User, as: 'doctor', attributes: ['name', 'specialization'] }
        ]
    });

    res.status(200).json(populatedAppointment);
});


// @desc    Get single appointment (with security guard)
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findByPk(req.params.id, {
        include: [
            { model: User, as: 'patient', attributes: ['name', 'email', 'phone'] },
            { model: User, as: 'doctor', attributes: ['name', 'email', 'specialization'] }
        ]
    });

    if (!appointment) {
        res.status(404);
        throw new Error('Appointment not found');
    }

    // permission check
    if (
        req.user.role !== 'admin' &&
        appointment.patientId !== req.user.id &&
        appointment.doctorId !== req.user.id
    ) {
        res.status(401);
        throw new Error('Not authorized to view this appointment');
    }

    res.status(200).json(appointment);
});

module.exports = {
    getAppointments,
    createAppointment,
    updateAppointmentStatus,
    getAppointmentById
};
