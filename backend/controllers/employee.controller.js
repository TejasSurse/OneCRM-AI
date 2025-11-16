// controllers/employee.controller.js
const Employee = require('../models/employee.model.js');
const bcrypt = require('bcryptjs');

// ADD EMPLOYEE
const addEmployee = async (req, res) => {
  try {
    const { name, email, pass, phone, salary, role } = req.body;

    if (![1, 2, 3].includes(role)) {
      return res.status(400).json({ message: 'Role must be 1, 2, or 3' });
    }

    const exists = await Employee.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashedPass = await bcrypt.hash(pass, 10);

    const employee = new Employee({
      name,
      email,
      pass: hashedPass,
      phone,
      salary,
      role
    });

    await employee.save();

    res.status(201).json({ message: 'Employee added', employee });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, pass, phone, salary, role } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;
    if (salary !== undefined) updates.salary = salary;
    if (role) {
      if (![1, 2, 3].includes(role))
        return res.status(400).json({ message: 'Role must be 1, 2, or 3' });
      updates.role = role;
    }
    if (pass) updates.pass = await bcrypt.hash(pass, 10);

    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    res.json({ message: 'Employee updated', employee });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email already exists' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET EMPLOYEE BY ID
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET ALL EMPLOYEES
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  getAllEmployees
};