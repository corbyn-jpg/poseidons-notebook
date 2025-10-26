const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticateToken = require('../middleware/auth');
const { requireAdmin } = require('../middleware/auth');

// List users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single user
router.get('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ['id', 'username', 'email', 'role'] });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user role or email/username (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) {
      if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role' });
      user.role = role;
    }

    await user.save();
    res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
