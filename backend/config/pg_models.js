const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize(process.env.POSTGRES_URI || 'postgres://postgres:root@localhost:5432/fixitmeet_db', {
    dialect: 'postgres',
    logging: false
});

// 1. User
const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'pro', 'patient'), defaultValue: 'patient' },
    status: { type: DataTypes.ENUM('active', 'inactive', 'pending'), defaultValue: 'active' },
    phone: { type: DataTypes.STRING },
    avatar: { type: DataTypes.STRING },
    specialization: { type: DataTypes.STRING }, // For Doctors
    experience: { type: DataTypes.STRING }, // For Pros
    bio: { type: DataTypes.TEXT },
    walletBalance: { type: DataTypes.FLOAT, defaultValue: 0 },
    address: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING }
}, {
    timestamps: true,
    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Custom method for password validation
User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 2. Service
const Service = sequelize.define('Service', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false }, // Healthcare, Home Services, etc.
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    discountPrice: { type: DataTypes.FLOAT },
    duration: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' }
}, { timestamps: true });

// 3. Appointment
const Appointment = sequelize.define('Appointment', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    date: { type: DataTypes.DATE, allowNull: false },
    timeSlot: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('scheduled', 'completed', 'cancelled', 'no-show'), defaultValue: 'scheduled' },
    type: { type: DataTypes.ENUM('Physical', 'Video'), defaultValue: 'Physical' },
    paymentStatus: { type: DataTypes.ENUM('pending', 'paid'), defaultValue: 'pending' },
    notes: { type: DataTypes.TEXT },
    diagnosis: { type: DataTypes.TEXT },
    medicines: { type: DataTypes.JSONB }, // Stores array of medicine objects
    meetingLink: { type: DataTypes.STRING } // For teleconsult
}, { timestamps: true });

// 4. Report
const Report = sequelize.define('Report', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    doctor: { type: DataTypes.STRING }, // Legacy field or Name of Dr
    name: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: false },
    fileType: { type: DataTypes.STRING },
    fileSize: { type: DataTypes.INTEGER }
}, { timestamps: true });

// 5. Transaction
const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    type: { type: DataTypes.ENUM('Deposit', 'Payment', 'Refund', 'Withdrawal'), allowNull: false },
    method: { type: DataTypes.STRING }, // Stripe, UPI, Wallet
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM('Processing', 'Completed', 'Failed'), defaultValue: 'Processing' },
    description: { type: DataTypes.STRING }
}, { timestamps: true });

// 6. Review
const Review = sequelize.define('Review', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('Published', 'Flagged', 'Hidden'), defaultValue: 'Published' }
}, { timestamps: true });

// 7. SupportTicket
const SupportTicket = sequelize.define('SupportTicket', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    subject: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING }, // Billing, Profile, Technical
    priority: { type: DataTypes.ENUM('Low', 'Medium', 'High', 'Urgent'), defaultValue: 'Medium' },
    status: { type: DataTypes.ENUM('Open', 'In Progress', 'Resolved', 'Closed'), defaultValue: 'Open' },
    description: { type: DataTypes.TEXT }
}, { timestamps: true });

// 8. Notification
const Notification = sequelize.define('Notification', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    type: { type: DataTypes.ENUM('info', 'success', 'warning', 'error'), defaultValue: 'info' }
}, { timestamps: true });

// 9. PartnerApplication
const PartnerApplication = sequelize.define('PartnerApplication', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    vertical: { type: DataTypes.STRING },
    specialty: { type: DataTypes.STRING },
    experience: { type: DataTypes.STRING },
    idProofPath: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' }
}, { timestamps: true });

// Relationships
// User <-> Service
User.hasMany(Service, { foreignKey: 'createdById', as: 'services' });
Service.belongsTo(User, { foreignKey: 'createdById', as: 'creator' });

// User <-> Appointment
User.hasMany(Appointment, { foreignKey: 'patientId', as: 'patientAppointments' });
Appointment.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });

User.hasMany(Appointment, { foreignKey: 'doctorId', as: 'doctorAppointments' });
Appointment.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });

Service.hasMany(Appointment, { foreignKey: 'serviceId' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

// User <-> Report
User.hasMany(Report, { foreignKey: 'patientId', as: 'reports' });
Report.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });

User.hasMany(Report, { foreignKey: 'doctorId' });
Report.belongsTo(User, { foreignKey: 'doctorId', as: 'uploader' });

// User <-> Transaction
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Review Relationships
User.hasMany(Review, { foreignKey: 'patientId', as: 'myReviews' });
Review.belongsTo(User, { foreignKey: 'patientId', as: 'reviewer' });

User.hasMany(Review, { foreignKey: 'doctorId', as: 'receivedReviews' });
Review.belongsTo(User, { foreignKey: 'doctorId', as: 'reviewedDr' });

Service.hasMany(Review, { foreignKey: 'serviceId' });
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'reviewedService' });

// SupportTicket Relationships
User.hasMany(SupportTicket, { foreignKey: 'userId', as: 'tickets' });
SupportTicket.belongsTo(User, { foreignKey: 'userId', as: 'reporter' });

// Notification Relationships
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'notifiedUser' });

const connectPG = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected via Sequelize (fixitmeet_db)');
        await sequelize.sync({ alter: true });
        console.log('PostgreSQL Models synced!');
    } catch (error) {
        console.error(`Error connecting to PostgreSQL: ${error.message}`);
    }
};

module.exports = {
    sequelize,
    connectPG,
    User,
    Service,
    Appointment,
    Report,
    Transaction,
    Review,
    SupportTicket,
    Notification,
    PartnerApplication
};
