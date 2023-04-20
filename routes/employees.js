const { Router } = require("express");
const employees = require("../data");

const router = Router();

// Get all employees
router.get("/", (req, res) => {
  res.json(employees);
});

// Get a specific employee by ID
router.get("/:id", (req, res) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id));
  if (!employee) return res.status(404).send("Employee not found");
  res.json(employee);
});

// Create a new employee
router.post("/", (req, res) => {
  const { name, department, email, phone } = req.body;
  if (!name || !department || !email || !phone)
    return res.status(400).send("Missing required fields");
  const id = Math.max(...employees.map((e) => e.id)) + 1;
  const employee = { id, name, department, email, phone };
  employees.push(employee);
  res.status(201).json(employee);
});

// Update an existing employee
router.put("/:id", (req, res) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id));
  if (!employee) return res.status(404).send("Employee not found");
  const { name, department, email, phone } = req.body;
  if (name) employee.name = name;
  if (department) employee.department = department;
  if (email) employee.email = email;
  if (phone) employee.phone = phone;
  res.json(employee);
});

// Delete an existing employee
router.delete("/:id", (req, res) => {
  const index = employees.findIndex((e) => e.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Employee not found");
  employees.splice(index, 1);
  res.sendStatus(204);
});

module.exports = router;
