const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  baseSalary: Number,
  allowances: {
    hra: Number,
    da: Number,
    other: Number,
  },
  deductions: {
    pf: Number,
    tax: Number,
    insurance: Number,
    other: Number,
  },
  netSalary: Number,
  totalEarnings: Number,
  totalDeductions: Number,
  paymentStatus: {
    type: String,
    enum: ['pending', 'processed', 'paid'],
    default: 'pending',
  },
  paymentDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payroll', payrollSchema);
