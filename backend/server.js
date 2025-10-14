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

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Poseidon\'s Notebook API is running',
    timestamp: new Date().toISOString()
  });
});

// For all other requests, send React app
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

// DB connection & start server
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Frontend being served from: ${path.join(__dirname, '../frontend/build')}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });