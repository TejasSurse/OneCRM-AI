// routes/employee.routes.js
const express = require('express');
const router = express.Router();

const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  getAllEmployees
} = require('../controllers/employee.controller.js');

router.post('/addEmployee', addEmployee);
router.put('/updateEmployee/:id', updateEmployee);
router.delete('/deleteEmployee/:id', deleteEmployee);
router.get('/getEmployee/:id', getEmployee);
router.get('/getAllEmployees', getAllEmployees);

module.exports = router;