const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// DB connection & start server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

const express = require('express');
const cors = require('cors');
const speciesRoutes = require('./routes/species');


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/species', speciesRoutes);