const express = require('express');
const Leave = require('../models/Leave');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Apply for leave
router.post('/apply', authMiddleware, async (req, res) => {
  try {
    const { leaveType, startDate, endDate, numberOfDays, reason } = req.body;
    const leave = new Leave({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      numberOfDays,
      reason,
      status: 'pending',
    });
    await leave.save();
    res.status(201).json({ message: 'Leave request submitted', leave });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get my leave requests
router.get('/my-leaves', authMiddleware, async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all leave requests (Admin only)
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('employeeId', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve/Reject leave (Admin only)
router.put('/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, comments } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status, approvedBy: req.user.id, comments, updatedAt: new Date() },
      { new: true }
    );
    res.json({ message: `Leave ${status}`, leave });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
