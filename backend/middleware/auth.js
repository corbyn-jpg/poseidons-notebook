// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const User = require('../models/user');

// Verifies JWT and attaches full user record (without password) to req.user
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // payload should contain id (from login)
    if (!payload || !payload.id) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    // Fetch full user from DB so we can access role and other info safely
    const user = await User.findByPk(payload.id, {
      attributes: ['id', 'username', 'email', 'role']
    });
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Middleware to require admin role
const requireAdmin = (req, res, next) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: 'Access token required' });
  if (user.role !== 'admin') return res.status(403).json({ error: 'Admin role required' });
  next();
};

module.exports = authenticateToken;
module.exports.requireAdmin = requireAdmin;