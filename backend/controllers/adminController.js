const asyncHandler = require('express-async-handler');
const { User, Service, Appointment, Transaction, Review, SupportTicket } = require('../config/pg_models');
const { Op } = require('sequelize');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
    // 1. Total Revenue (from completed transactions)
    const totalRevenue = await Transaction.sum('amount', {
        where: { status: 'Completed', type: 'Payment' }
    }) || 0;

    // 2. Active Pros
    const activePros = await User.count({
        where: { role: 'pro', status: 'active' }
    });

    // 3. New Bookings (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newBookings = await Appointment.count({
        where: {
            createdAt: { [Op.gte]: thirtyDaysAgo }
        }
    });

    // 4. Completion Rate
    const totalAppointments = await Appointment.count();
    const completedAppointments = await Appointment.count({ where: { status: 'completed' } });
    const completionRate = totalAppointments > 0 ? (completedAppointments / totalAppointments) * 100 : 0;

    // 5. Vertical Performance
    const services = await Service.findAll();
    const verticalPerf = [];
    const categories = ['Healthcare', 'Home Services', 'Pest Control'];

    for (const cat of categories) {
        const count = await Appointment.count({
            include: [{
                model: Service,
                as: 'service',
                where: { category: cat }
            }]
        });
        verticalPerf.push({ name: cat, orders: count, growth: '+0%', color: cat === 'Healthcare' ? '#10b981' : cat === 'Home Services' ? '#fbbf24' : '#3b82f6' });
    }

    // 6. Recent Bookings
    const recentBookings = await Appointment.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [
            { model: User, as: 'patient', attributes: ['name'] },
            { model: User, as: 'doctor', attributes: ['name'] },
            { model: Service, as: 'service', attributes: ['category'] }
        ]
    });

    res.json({
        stats: [
            { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: 'FiDollarSign', trend: '+0%', color: '#10b981' },
            { label: 'Active Pros', value: activePros.toLocaleString(), icon: 'FiUsers', trend: '+0%', color: '#fbbf24' },
            { label: 'New Bookings', value: newBookings.toString(), icon: 'FiCalendar', trend: '+0%', color: '#3b82f6' },
            { label: 'Completion Rate', value: `${completionRate.toFixed(1)}%`, icon: 'FiCheckCircle', trend: 'Stable', color: '#8b5cf6' },
        ],
        verticalPerf,
        recentBookings: recentBookings.map(b => ({
            id: b.id.substring(0, 8).toUpperCase(),
            user: b.patient?.name || 'Unknown',
            pro: b.doctor?.name || 'N/A',
            vertical: b.service?.category || 'General',
            status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
            date: new Date(b.date).toLocaleDateString()
        }))
    });
});

// @desc    Get All Users (for Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['createdAt', 'DESC']]
    });
    res.json(users);
});

// @desc    Update User Status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
const updateUserStatus = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        user.status = req.body.status || user.status;
        await user.save();
        res.json({ message: 'User status updated' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get All Bookings
// @route   GET /api/admin/bookings
// @access  Private/Admin
const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Appointment.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            { model: User, as: 'patient', attributes: ['name', 'id'] },
            { model: User, as: 'doctor', attributes: ['name', 'id'] },
            { model: Service, as: 'service', attributes: ['name', 'category', 'price'] }
        ]
    });
    res.json(bookings.map(b => ({
        id: b.id.substring(0, 8).toUpperCase(),
        realId: b.id,
        user: b.patient?.name || 'Unknown',
        pro: b.doctor?.name || 'N/A',
        vertical: b.service?.category || 'General',
        status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
        date: new Date(b.date).toLocaleDateString(),
        time: b.timeSlot,
        amount: b.service?.price || 0
    })));
});

// @desc    Get All Transactions
// @route   GET /api/admin/payments
// @access  Private/Admin
const getAllTransactions = asyncHandler(async (req, res) => {
    const txs = await Transaction.findAll({
        order: [['createdAt', 'DESC']],
        include: [{ model: User, as: 'user', attributes: ['name', 'email'] }]
    });
    res.json(txs);
});

// @desc    Get All Reviews
// @route   GET /api/admin/reviews
// @access  Private/Admin
const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            { model: User, as: 'reviewer', attributes: ['name'] },
            { model: User, as: 'reviewedDr', attributes: ['name'] },
            { model: Service, as: 'reviewedService', attributes: ['name', 'category'] }
        ]
    });
    res.json(reviews.map(r => ({
        id: `REV-${r.id.substring(0, 4).toUpperCase()}`,
        customer: r.reviewer?.name || 'Anonymous',
        provider: r.reviewedDr?.name || 'N/A',
        vertical: r.reviewedService?.category || 'General',
        rating: r.rating,
        comment: r.comment,
        date: new Date(r.createdAt).toLocaleDateString(),
        status: r.status
    })));
});

// @desc    Get All Support Tickets
// @route   GET /api/admin/tickets
// @access  Private/Admin
const getAllTickets = asyncHandler(async (req, res) => {
    const tickets = await SupportTicket.findAll({
        order: [['createdAt', 'DESC']],
        include: [{ model: User, as: 'reporter', attributes: ['name'] }]
    });
    res.json(tickets.map(t => ({
        id: `TKT-${t.id.substring(0, 4).toUpperCase()}`,
        user: t.reporter?.name || 'User',
        type: t.type,
        priority: t.priority,
        status: t.status,
        time: new Date(t.createdAt).toLocaleDateString()
    })));
});

module.exports = {
    getAdminStats,
    getAllUsers,
    updateUserStatus,
    getAllBookings,
    getAllTransactions,
    getAllReviews,
    getAllTickets
};
