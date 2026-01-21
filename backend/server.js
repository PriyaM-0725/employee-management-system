const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const connectDB = require("./config/db");
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/employees", require("./routes/employeeRoutes"));

// Test Route
app.get("/", (req, res) => {
  res.send("Employee Management API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});