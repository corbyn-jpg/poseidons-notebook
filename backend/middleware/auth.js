// middleware/auth.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware factory to require a minimum role.
// Example: requireRole('superadmin') will only allow superadmins.
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Authentication required' });
    const userRole = req.user.role || 'user';
    const roleHierarchy = ['user', 'admin', 'superadmin'];
    const requiredIndex = roleHierarchy.indexOf(role);
    const userIndex = roleHierarchy.indexOf(userRole);
    if (requiredIndex === -1) return res.status(500).json({ error: 'Invalid role configured on server' });
    if (userIndex < requiredIndex) return res.status(403).json({ error: 'Insufficient permissions' });
    next();
  };
};

module.exports = {
  authenticateToken,
  requireRole
};