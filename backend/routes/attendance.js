const express = require('express');
const Attendance = require('../models/Attendance');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get attendance for current user
router.get('/my-attendance', authMiddleware, async (req, res) => {
  try {
    const attendance = await Attendance.find({ employeeId: req.user.id }).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all attendance (Admin only)
router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('employeeId', 'firstName lastName email').sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark attendance
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { date, status, checkInTime, checkOutTime, remarks } = req.body;
    const attendance = new Attendance({
      employeeId: req.user.id,
      date,
      status,
      checkInTime,
      checkOutTime,
      remarks,
    });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update attendance (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true }
    );
    res.json({ message: 'Attendance updated', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
