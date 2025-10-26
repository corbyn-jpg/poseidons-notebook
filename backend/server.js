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
let usersRoutes;
try {
  usersRoutes = require('./routes/users');
  console.log('Loaded usersRoutes');
} catch (e) {
  console.error('Failed to load usersRoutes:', e);
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
// Helper to safely register routes with detailed logging
function safeRegister(pathValue, handler, name) {
  try {
    const handlerType = handler && handler.constructor ? handler.constructor.name : typeof handler;
    console.log(`Attempting to register route: path=${String(pathValue)}, handlerType=${handlerType}, name=${name || 'unknown'}`);

    // If pathValue looks like a full URL accidentally, warn (common mistake)
    if (typeof pathValue === 'string' && /https?:\/\//i.test(pathValue)) {
      console.warn(`WARNING: route path looks like a URL: ${pathValue}`);
    }

    // Defensive check: ensure handler is a function or an express router (object with 'use'/'stack')
    const isRouterLike = handler && (typeof handler === 'function' || (typeof handler === 'object' && (handler.handle || handler.stack || handler.use)));
    if (!isRouterLike) {
      console.warn(`Handler for ${pathValue} does not look like a router/middleware. handler:`, handler);
    }

    app.use(pathValue, handler);
    console.log(`Registered ${String(pathValue)} successfully`);
  } catch (e) {
    console.error(`Failed to register ${String(pathValue)}:`, e && e.stack ? e.stack : e);
    throw e; // rethrow so startup logging/uncaughtException shows full failure
  }
}

if (authRoutes) {
  safeRegister('/api/auth', authRoutes, 'authRoutes');
}
if (speciesRoutes) {
  safeRegister('/api/species', speciesRoutes, 'speciesRoutes');
}
if (sightingsRoutes) {
  safeRegister('/api/sightings', sightingsRoutes, 'sightingsRoutes');
}
if (usersRoutes) {
  safeRegister('/api/users', usersRoutes, 'usersRoutes');
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
  // Also serve any static images checked into the frontend public folder so
  // requests to /images/species/... (which are stored in the DB) resolve even
  // when the CRA build didn't include hashed versions. This is defensive and
  // safe because it only serves the `images` subtree.
  const frontendImages = path.join(__dirname, '..', 'frontend', 'public', 'images');
  app.use('/images', express.static(frontendImages));
  console.log(`Registered static images from ${frontendImages} at /images`);
} catch (e) {
  console.error('Failed to register frontend images static middleware:', e && e.stack ? e.stack : e);
}

try {
  // Register a minimal GET-only middleware after static so client-side routes are handled without
  // invoking Express's path parsing for a pattern string. This avoids triggering path-to-regexp
  // on any accidental URL-like token in route definitions.
  app.use(function (req, res, next) {
    if (req.method !== 'GET') return next();
    try {
      const indexPath = path.join(__dirname, 'public', 'index.html');
      if (!indexPath || /https?:\/\//i.test(String(indexPath))) {
        console.error('Refusing to serve fallback because indexPath looks like a URL:', indexPath);
        return res.status(500).send('Server configuration error');
      }
      res.sendFile(indexPath, function (err) {
        if (err) {
          console.error('Error sending index.html in fallback middleware:', err);
          return next(err);
        }
      });
    } catch (err) {
      console.error('Exception in fallback middleware:', err && err.stack ? err.stack : err);
      next(err);
    }
  });
  console.log('Registered safe fallback GET middleware (app.use)');
} catch (e) {
  console.error('Failed to register safe fallback middleware:', e && e.stack ? e.stack : e);
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