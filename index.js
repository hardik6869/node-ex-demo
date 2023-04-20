const express = require("express");
const employeesRouter = require("./routes/employees");

const app = express();

// Add middleware
app.use(express.json());

// Mount the employees router at /api/employees
app.use("/api/employees", employeesRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
