const express = require('express');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all employees (Admin only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get employee by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const employee = await User.findById(req.params.id).select('-password');
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update employee profile
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, phone, address, profilePicture, department, position } = req.body;
    const employee = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, phone, address, profilePicture, department, position, updatedAt: new Date() },
      { new: true }
    ).select('-password');
    res.json({ message: 'Profile updated', employee });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update salary (Admin only)
router.put('/:id/salary', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { baseSalary, allowances, deductions } = req.body;
    const employee = await User.findByIdAndUpdate(
      req.params.id,
      {
        salary: {
          baseSalary,
          allowances,
          deductions,
          netSalary: baseSalary + allowances - deductions,
        },
      },
      { new: true }
    ).select('-password');
    res.json({ message: 'Salary updated', employee });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
