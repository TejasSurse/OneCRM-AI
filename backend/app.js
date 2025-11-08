// app.js
require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require("./db/index.js");
const userRoutes = require("./routes/user.routes.js");
const employeeRoutes = require("./routes/employee.routes.js"); 

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user', userRoutes);
app.use('/employee', employeeRoutes);

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
