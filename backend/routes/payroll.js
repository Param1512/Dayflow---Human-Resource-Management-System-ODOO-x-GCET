const express = require('express');
const Payroll = require('../models/Payroll');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get payroll for current user
router.get('/my-payroll', authMiddleware, async (req, res) => {
  try {
    const payroll = await Payroll.find({ employeeId: req.user.id }).sort({ year: -1, month: -1 });
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all payroll (Admin only)
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const payroll = await Payroll.find()
      .populate('employeeId', 'firstName lastName email employeeId')
      .sort({ year: -1, month: -1 });
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create/Update payroll (Admin only)
router.post('/:employeeId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { month, year, baseSalary, allowances, deductions, paymentStatus } = req.body;

    const totalEarnings = baseSalary + (allowances.hra || 0) + (allowances.da || 0) + (allowances.other || 0);
    const totalDeductions = (deductions.pf || 0) + (deductions.tax || 0) + (deductions.insurance || 0) + (deductions.other || 0);
    const netSalary = totalEarnings - totalDeductions;

    let payroll = await Payroll.findOne({
      employeeId: req.params.employeeId,
      month,
      year,
    });

    if (payroll) {
      payroll.baseSalary = baseSalary;
      payroll.allowances = allowances;
      payroll.deductions = deductions;
      payroll.totalEarnings = totalEarnings;
      payroll.totalDeductions = totalDeductions;
      payroll.netSalary = netSalary;
      payroll.paymentStatus = paymentStatus;
    } else {
      payroll = new Payroll({
        employeeId: req.params.employeeId,
        month,
        year,
        baseSalary,
        allowances,
        deductions,
        totalEarnings,
        totalDeductions,
        netSalary,
        paymentStatus,
      });
    }

    await payroll.save();
    res.status(201).json({ message: 'Payroll saved', payroll });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
