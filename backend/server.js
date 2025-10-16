// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const speciesRoutes = require("./routes/species"); 
const sightingsRoutes = require("./routes/sightings");

dotenv.config();
const app = express();

// Debug: log suspicious env vars to help diagnose routing errors on Heroku
const suspiciousEnv = Object.keys(process.env).filter(k => /https?:|git\.new|DEBUG/i.test(process.env[k] || ''));
if (suspiciousEnv.length > 0) {
  console.log('Suspicious env vars detected:');
  suspiciousEnv.forEach(k => console.log(`${k}=${process.env[k]}`));
} else {
  console.log('No suspicious env vars detected at startup.');
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/species", speciesRoutes);
app.use("/api/sightings", sightingsRoutes); 
app.use(express.static('public'));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// DB connection & start server with better logging
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    // Exit process so Heroku marks the deploy as failed and we can see the error
    process.exit(1);
  }
})();