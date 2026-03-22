const asyncHandler = require('express-async-handler');
const { PartnerApplication, User } = require('../../config/pg_models');

// @desc    Submit a partner application
// @route   POST /api/partners
// @access  Public
const submitPartner = asyncHandler(async (req, res) => {
    const { name, email, phone, vertical, specialty, experience } = req.body;
    if (!name || !email) {
        res.status(400);
        throw new Error('Name and email are required');
    }

    let idProofPath = null;
    if (req.file) {
        idProofPath = 'partners/' + req.file.filename;
    }

    const app = await PartnerApplication.create({
        name,
        email,
        phone,
        vertical,
        specialty,
        experience,
        idProofPath
    });

    res.status(201).json(app);
});

// @desc    List pending partner applications (admin)
// @route   GET /api/partners
// @access  Private/Admin
const listPartners = asyncHandler(async (req, res) => {
    const apps = await PartnerApplication.findAll({ where: { status: 'pending' } });
    res.status(200).json(apps);
});

// @desc    Update status of partner application
// @route   PUT /api/partners/:id
// @access  Private/Admin
const updatePartner = asyncHandler(async (req, res) => {
    const app = await PartnerApplication.findByPk(req.params.id);
    if (!app) {
        res.status(404);
        throw new Error('Application not found');
    }
    const { status } = req.body;
    if (status) app.status = status;
    await app.save();

    // If approved, create a User account for the Professional
    if (status === 'approved') {
        const password = Math.random().toString(36).slice(-8); // Generate random password
        await User.create({
            name: app.name,
            email: app.email,
            password: password, // This will be hashed by beforeSave hook in pg_models
            role: 'pro',
            phone: app.phone,
            specialization: app.vertical === 'Healthcare' ? app.specialty : null,
            experience: app.experience,
        });

        // Include raw password in response so admin can show/send it (once)
        const responseJson = app.toJSON();
        responseJson.generatedPassword = password;
        return res.status(200).json(responseJson);
    }

    res.status(200).json(app);
});

module.exports = { submitPartner, listPartners, updatePartner };