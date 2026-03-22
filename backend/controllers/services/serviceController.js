const asyncHandler = require('express-async-handler');
const { Service, User } = require('../../config/pg_models');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
    // Optional filtering, e.g., ?category=Healthcare
    let whereClause = {};
    if (req.query.category) {
        whereClause.category = req.query.category;
    }
    const services = await Service.findAll({
        where: whereClause,
        include: [{ model: User, as: 'creator', attributes: ['name', 'email'] }]
    });
    res.status(200).json(services);
});

// @desc    Get service by id
// @route   GET /api/services/:id
// @access  Public
const getServiceById = asyncHandler(async (req, res) => {
    const service = await Service.findByPk(req.params.id, {
        include: [{ model: User, as: 'creator', attributes: ['name', 'email'] }]
    });
    if (service) {
        res.status(200).json(service);
    } else {
        res.status(404);
        throw new Error('Service not found');
    }
});

// @desc    Create new service
// @route   POST /api/services
// @access  Private/Admin
const createService = asyncHandler(async (req, res) => {
    const { name, category, description, price, duration, status } = req.body;

    if (!name || !category || price == null || price === '') {
        res.status(400);
        throw new Error('Please add required fields: name, category, price');
    }

    const service = await Service.create({
        name,
        category,
        description: description || '',
        price: Number(price),
        duration: duration || '',
        status: status === 'inactive' ? 'inactive' : 'active',
        createdById: req.user.id
    });

    res.status(201).json(service);
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = asyncHandler(async (req, res) => {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Service not found');
    }

    const { name, category, description, price, duration, status } = req.body;
    if (name !== undefined) service.name = name;
    if (category !== undefined) service.category = category;
    if (description !== undefined) service.description = description;
    if (price !== undefined) service.price = Number(price);
    if (duration !== undefined) service.duration = duration;
    if (status !== undefined && ['active', 'inactive'].includes(status)) service.status = status;

    await service.save();
    res.status(200).json(service);
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Service not found');
    }

    await service.destroy();
    res.status(200).json({ id: req.params.id, message: 'Service deleted' });
});

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};
