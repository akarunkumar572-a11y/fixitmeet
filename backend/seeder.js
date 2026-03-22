const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
dotenv.config();

const { sequelize, User, Service, Appointment, Report, Transaction, Review, SupportTicket, Notification, PartnerApplication } = require('./config/pg_models');

// ensure upload directories exist
const uploadDir = path.join(__dirname, 'uploads', 'reports');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const seedData = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        // 1. Users
        const admin = await User.create({
            name: 'Platform Admin',
            email: 'admin@example.com',
            password: 'password',
            role: 'admin',
        });

        const doctor = await User.create({
            name: 'Dr. Michael Chen',
            email: 'drsmith@example.com',
            password: 'password',
            role: 'pro',
            specialization: 'Cardiology',
            experience: '12 Years',
            bio: 'Expert in non-invasive cardiology and preventative care.'
        });

        const patient = await User.create({
            name: 'Jane Patient',
            email: 'jane@example.com',
            password: 'password',
            role: 'patient',
            walletBalance: 2500,
            city: 'Mumbai'
        });

        // 2. Services
        const s1 = await Service.create({
            name: 'General Heart Checkup',
            category: 'Healthcare',
            description: 'Comprehensive cardiac screening including ECG.',
            price: 1500,
            duration: '45 mins',
            createdById: admin.id
        });

        const s2 = await Service.create({
            name: 'Deep Home Cleaning',
            category: 'Home Services',
            description: 'Full house sanitation and deep cleaning.',
            price: 3500,
            discountPrice: 2999,
            duration: '4 hours',
            createdById: admin.id
        });

        // 3. Appointments
        const apt = await Appointment.create({
            patientId: patient.id,
            doctorId: doctor.id,
            serviceId: s1.id,
            date: new Date(),
            timeSlot: '10:30 AM',
            status: 'scheduled',
            type: 'Video',
            paymentStatus: 'paid'
        });

        // 4. Reports
        const dummyPath = path.join(uploadDir, 'blood-report.pdf');
        fs.writeFileSync(dummyPath, 'Dummy PDF content for medical report');
        await Report.create({
            patientId: patient.id,
            doctorId: doctor.id,
            appointmentId: apt.id,
            name: 'Annual Blood Analysis',
            filePath: dummyPath,
            fileType: 'application/pdf',
            fileSize: 2048
        });

        // 5. Transactions
        await Transaction.create({
            userId: patient.id,
            type: 'Deposit',
            method: 'UPI',
            amount: 2500,
            status: 'Completed',
            description: 'Wallet top-up'
        });

        await Transaction.create({
            userId: patient.id,
            type: 'Payment',
            method: 'Wallet',
            amount: 1500,
            status: 'Completed',
            description: 'Payment for Appointment #' + apt.id.substring(0, 8)
        });

        // 6. Reviews
        await Review.create({
            patientId: patient.id,
            doctorId: doctor.id,
            serviceId: s1.id,
            rating: 5,
            comment: 'Excellent service and very knowledgeable doctor.',
            status: 'Published'
        });

        // 7. Support Tickets
        await SupportTicket.create({
            userId: patient.id,
            subject: 'Refund for cancelled appointment',
            type: 'Billing',
            priority: 'High',
            status: 'Open',
            description: 'My appointment was cancelled but the refund is not reflecting in my wallet.'
        });

        // 8. Notifications
        await Notification.create({
            userId: patient.id,
            title: 'Appointment Confirmed',
            message: 'Your appointment with Dr. Michael Chen is confirmed for tomorrow.',
            type: 'success'
        });

        // 9. Partner Applications
        await PartnerApplication.create({
            name: 'Professional Plumber Ravi',
            email: 'ravi@plumbing.com',
            phone: '9876543210',
            vertical: 'Home Services',
            specialty: 'Leakage Expert',
            experience: '10 years',
            status: 'pending'
        });

        console.log('PostgreSQL Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
