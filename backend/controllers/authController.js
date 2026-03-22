const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../config/pg_models');
const asyncHandler = require('express-async-handler');

// simple in-memory OTP storage: { mobile: { code, expires } }
const otpStore = {};

// helper to generate 6-digit code
const genCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate JWT for Auth
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user (Patient, Pro, or Admin)
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, specialization, phone } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password, // Pre-save hook hashes it automatically
        role: role || 'patient',
        specialization,
        phone
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            specialization: user.specialization,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ where: { email } });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            specialization: user.specialization,
            token: generateToken(user.id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user profile securely
// @route   GET /api/auth/profile
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const { name, email, password, specialization, phone } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (specialization) user.specialization = specialization;
    if (phone) user.phone = phone;
    if (password) user.password = password; // will hash in pre-save

    const updated = await user.save();
    res.status(200).json({
        _id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        token: generateToken(updated.id),
    });
});

// OTP request - send code to mobile (here we just log it)
const requestOtp = asyncHandler(async (req, res) => {
    const { mobile } = req.body;
    if (!mobile) {
        res.status(400);
        throw new Error('Mobile number required');
    }
    const code = genCode();
    otpStore[mobile] = { code, expires: Date.now() + 5 * 60 * 1000 }; // 5min
    console.log(`OTP for ${mobile}: ${code}`);
    res.status(200).json({ message: 'OTP sent' });
});

// verify OTP and return token (creates user if not exists)
const verifyOtp = asyncHandler(async (req, res) => {
    const { mobile, code } = req.body;
    if (!mobile || !code) {
        res.status(400);
        throw new Error('Mobile and code required');
    }
    const record = otpStore[mobile];
    if (!record || record.code !== code || record.expires < Date.now()) {
        res.status(401);
        throw new Error('Invalid or expired OTP');
    }
    // delete used otp
    delete otpStore[mobile];

    // find or create patient user
    let user = await User.findOne({ where: { phone: mobile } });
    if (!user) {
        user = await User.create({
            name: mobile,
            email: `${mobile}@otp.local`,
            password: Math.random().toString(36),
            role: 'patient',
            phone: mobile
        });
    }
    res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialization: user.specialization,
        token: generateToken(user.id),
    });
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateMe,
    requestOtp,
    verifyOtp
};
