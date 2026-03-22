const asyncHandler = require('express-async-handler');
const { Report, User } = require('../../config/pg_models');
const path = require('path');

// @desc    Get all reports (Patient sees theirs, Doctor sees their patients' reports)
// @route   GET /api/reports
// @access  Private
const getReports = asyncHandler(async (req, res) => {
    let whereClause = {};

    if (req.user.role === 'patient') {
        whereClause.patientId = req.user.id;
    } else if (req.user.role === 'pro') {
        // If a patientId is provided in query, show those specifically
        if (req.query.patientId) {
            whereClause.patientId = req.query.patientId;
        } else {
            // Otherwise show all reports where this doctor is mentioned or has uploaded
            // For now, simplify: Doctors can see any report if they have the ID, 
            // but the 'list' for a doctor should probably be filtered by their patients.
            // We'll use req.query.patientId primarily.
            res.status(400);
            throw new Error('Patient ID is required for professional view');
        }
    }

    const reports = await Report.findAll({
        where: whereClause,
        include: [{ model: User, as: 'patient', attributes: ['name', 'email'] }],
        order: [['createdAt', 'DESC']]
    });
    res.status(200).json(reports);
});

// @desc    Upload a new report
// @route   POST /api/reports
// @access  Private (patient or doctor)
const uploadReport = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No file uploaded');
    }
    const { originalname, mimetype, size, path: filepath } = req.file;
    const { name, doctor, patientId } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Report name is required');
    }

    const report = await Report.create({
        patientId: req.user.role === 'patient' ? req.user.id : patientId,
        doctorId: req.user.role === 'pro' ? req.user.id : null,
        doctor,
        name,
        filePath: filepath,
        fileType: mimetype,
        fileSize: size
    });
    res.status(201).json(report);
});

// @desc    Download report by id
// @route   GET /api/reports/:id/download
// @access  Private
const downloadReport = asyncHandler(async (req, res) => {
    const report = await Report.findByPk(req.params.id);
    if (!report) {
        res.status(404);
        throw new Error('Report not found');
    }

    // Authorization: Admin, the Patient themselves, or any Pro (for now, can be tightened to 'assigned pros')
    if (
        req.user.role !== 'admin' &&
        req.user.role !== 'pro' &&
        report.patientId !== req.user.id
    ) {
        res.status(401);
        throw new Error('Not authorized to access this report');
    }
    res.download(path.resolve(report.filePath), report.name);
});

module.exports = { getReports, uploadReport, downloadReport };