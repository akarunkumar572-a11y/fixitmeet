const jwt = require('jsonwebtoken');
const { User } = require('../config/pg_models');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check header for 'Bearer [token]'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token (exclude password)
            req.user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            next();
        } catch (error) {
            console.error('JWT Error:', error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Admin-only Access
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

// Pro or Admin Access
const proOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'pro' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized. Pro or admin access only');
    }
};

module.exports = { protect, admin, proOrAdmin };
