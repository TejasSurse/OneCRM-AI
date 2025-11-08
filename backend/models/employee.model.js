const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  pass: { // Renamed from 'password' to 'pass' to match controller
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    required: true
  },
  role: {
    type: Number, // Assuming role is a number (1, 2, or 3)
    required: true,
    enum: [1, 2, 3] // Enforce roles 1, 2, 3
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;