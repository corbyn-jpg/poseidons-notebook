const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create user
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User created!', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful!', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(express.json());

module.exports = router;