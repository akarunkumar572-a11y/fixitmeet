console.log('server.js executing');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { connectPG } = require('./config/pg_models');

const path = require('path');

console.log('Starting server, connecting to database...');
// Connect Database
connectDB().catch(err => {
    console.error('MongoDB database connection failed:', err);
    process.exit(1);
});

// Setup Postgres Connection
connectPG();

const fs = require('fs');

const app = express();

// ensure uploads folder exists
const uploadPath = path.join(__dirname, 'uploads', 'reports');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}
// partner uploads
const partnerPath = path.join(__dirname, 'uploads', 'partners');
if (!fs.existsSync(partnerPath)) {
    fs.mkdirSync(partnerPath, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount Routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/services', require('./routes/services/serviceRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/users', require('./routes/userRoutes')); // user management endpoints
app.use('/api/reports', require('./routes/healthcare/reportRoutes')); // patient medical reports
app.use('/api/transactions', require('./routes/transactionRoutes')); // wallet/transaction history
app.use('/api/partners', require('./routes/services/partnerRoutes')); // partner application submissions
app.use('/api/admin', require('./routes/adminRoutes')); // main admin dashboard & controls
app.use('/api/ai', require('./routes/aiRoutes')); // AI Chat & Booking assistant

// serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'));
    });
} else {
    // Basic health check route for non-prod
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
