const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// CREATE employee
router.post("/", async (req, res) => {
  try {
    const { name, email, department, position, salary } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and Email are required"
      });
    }

    const employee = new Employee({
      name,
      email,
      department: department.toLowerCase(), // 🔹 normalize
      position,
      salary
    });

    await employee.save();
    res.status(201).json(employee);

  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL employees
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// GET employees by department
router.get("/department/:dept", async (req, res) => {
  const dept = req.params.dept.toLowerCase();

  const employees = await Employee.find({
    department: dept
  });

  res.json(employees);
});

// UPDATE employee
router.put("/:id", async (req, res) => {
  if (req.body.department) {
    req.body.department = req.body.department.toLowerCase();
  }

  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
});

module.exports = router;




















