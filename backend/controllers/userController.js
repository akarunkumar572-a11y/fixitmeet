const asyncHandler = require('express-async-handler');
const { User } = require('../config/pg_models');

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
});

// @desc    Get a single user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user);
});

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    await user.destroy();
    res.status(200).json({ message: 'User removed' });
});

// @desc    Update user (admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const { name, email, role, status, specialization, phone } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (status) user.status = status;
    if (specialization) user.specialization = specialization;
    if (phone) user.phone = phone;

    await user.save();
    res.status(200).json(user);
});

// @desc    Public list of doctors/pros
// @route   GET /api/users/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
    const doctors = await User.findAll({
        where: { role: 'pro', status: 'active' },
        attributes: { exclude: ['password'] }
    });
    res.status(200).json(doctors);
});

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    getDoctors,
};
