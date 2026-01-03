const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Connected to MongoDB');

    // Clear existing users (optional)
    // await User.deleteMany({});
    // console.log('✓ Cleared existing users');

    // Create test users
    const testUsers = [
      {
        employeeId: 'EMP001',
        email: 'admin@dayflow.com',
        password: 'Admin@123456',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        department: 'HR',
        position: 'HR Manager',
        phone: '9876543210',
        salary: {
          baseSalary: 100000,
          allowances: 20000,
          deductions: 10000,
          netSalary: 110000,
        },
      },
      {
        employeeId: 'EMP002',
        email: 'hr@dayflow.com',
        password: 'HR@123456',
        firstName: 'HR',
        lastName: 'Officer',
        role: 'hr',
        department: 'HR',
        position: 'HR Officer',
        phone: '9876543211',
        salary: {
          baseSalary: 75000,
          allowances: 15000,
          deductions: 8000,
          netSalary: 82000,
        },
      },
      {
        employeeId: 'EMP003',
        email: 'employee@dayflow.com',
        password: 'Emp@123456',
        firstName: 'John',
        lastName: 'Doe',
        role: 'employee',
        department: 'IT',
        position: 'Software Engineer',
        phone: '9876543212',
        salary: {
          baseSalary: 60000,
          allowances: 12000,
          deductions: 6000,
          netSalary: 66000,
        },
      },
    ];

    for (const userData of testUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`⚠ User ${userData.email} already exists`);
      } else {
        const user = new User(userData);
        await user.save();
        console.log(`✓ Created user: ${userData.email}`);
      }
    }

    console.log('\n✓ Database seeding completed!');
    console.log('\nTest Credentials:');
    console.log('─────────────────────────────────────');
    console.log('Admin:');
    console.log('  Email: admin@dayflow.com');
    console.log('  Password: Admin@123456');
    console.log('');
    console.log('HR:');
    console.log('  Email: hr@dayflow.com');
    console.log('  Password: HR@123456');
    console.log('');
    console.log('Employee:');
    console.log('  Email: employee@dayflow.com');
    console.log('  Password: Emp@123456');
    console.log('─────────────────────────────────────\n');

    await mongoose.disconnect();
    console.log('✓ MongoDB disconnected');
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

seedUsers();
