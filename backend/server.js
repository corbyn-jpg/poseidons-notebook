const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const speciesRoutes = require("./routes/species"); 
const sightingsRoutes = require("./routes/sightings");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/species", speciesRoutes);
app.use("/api/sightings", sightingsRoutes);

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Poseidon\'s Notebook API is running' });
});

// Catch all handler: send back React's index.html file for SPA
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// DB connection & start server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});