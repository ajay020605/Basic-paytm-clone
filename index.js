const express = require("express");
const app = express();
const routes = require("../backend/routes/routes");
const connectDB = require("../backend/config/db");
require("dotenv").config();
const cors = require("cors");
app.use(cors());

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Route handler
app.use("/api/v1", routes);

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
