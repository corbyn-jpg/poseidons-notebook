// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
let authRoutes, speciesRoutes, sightingsRoutes;
try {
  authRoutes = require("./routes/authRoutes");
  console.log('Loaded authRoutes');
} catch (e) {
  console.error('Failed to load authRoutes:', e);
}
try {
  speciesRoutes = require("./routes/species");
  console.log('Loaded speciesRoutes');
} catch (e) {
  console.error('Failed to load speciesRoutes:', e);
}
try {
  sightingsRoutes = require("./routes/sightings");
  console.log('Loaded sightingsRoutes');
} catch (e) {
  console.error('Failed to load sightingsRoutes:', e);
}

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

// Routes (wrapped to log which registration throws)
if (authRoutes) {
  try {
    app.use("/api/auth", authRoutes);
    console.log('Registered /api/auth');
  } catch (e) {
    console.error('Failed to register /api/auth:', e);
  }
}
if (speciesRoutes) {
  try {
    app.use("/api/species", speciesRoutes);
    console.log('Registered /api/species');
  } catch (e) {
    console.error('Failed to register /api/species:', e);
  }
}
if (sightingsRoutes) {
  try {
    app.use("/api/sightings", sightingsRoutes);
    console.log('Registered /api/sightings');
  } catch (e) {
    console.error('Failed to register /api/sightings:', e);
  }
}
// Serve static frontend (wrapped to catch malformed patterns)
const path = require('path');
try {
  app.use(express.static('public'));
  console.log('Registered express.static("public")');
} catch (e) {
  console.error('Failed to register express.static("public"):', e);
}

try {
  app.use(express.static(path.join(__dirname, 'public')));
  console.log('Registered express.static(path.join(__dirname, "public"))');
} catch (e) {
  console.error('Failed to register express.static(public path):', e);
}

try {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  console.log('Registered fallback app.get("*") route');
} catch (e) {
  console.error('Failed to register fallback app.get("*") route:', e);
}

// Capture uncaught exceptions to ensure Heroku logs show the full stack
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err && err.stack ? err.stack : err);
  process.exit(1);
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