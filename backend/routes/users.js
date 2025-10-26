const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { authenticateToken, isSuperAdmin } = require('../middleware/auth');

// List users (superadmin only)
router.get('/', authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    res.json(users);
  } catch (err) {
    console.error('Error listing users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create user (superadmin only)
router.post('/', authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user (superadmin only)
router.put('/:id', authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (role) updates.role = role;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      updates.password = bcrypt.hashSync(password, salt);
    }

    await user.update(updates);
    res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user (superadmin only)
router.delete('/:id', authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
