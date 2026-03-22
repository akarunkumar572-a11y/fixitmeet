const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

async function createSuperAdmin() {
  try {
    await connectDB();

    const args = process.argv.slice(2);
    if (args.length < 2) {
      console.error('Usage: node createSuperAdmin.js <email> <password> [name]');
      process.exit(1);
    }
    const [email, password, name = 'Super Admin'] = args;

    // check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`User with email ${email} already exists.`);
      process.exit();
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'admin',
    });

    console.log('Superadmin created:', user);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createSuperAdmin();
