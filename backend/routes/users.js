const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { authenticateToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');

// Get all users (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single user by id (admin only)
router.get('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: ['id', 'username', 'email', 'role'] });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user (admin only) - can change role
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { username, email, role } = req.body;
    await user.update({
      username: username || user.username,
      email: email || user.email,
      role: role || user.role
    });

    res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
