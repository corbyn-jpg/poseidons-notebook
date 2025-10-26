// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Op } = require("sequelize");

// Use environment variable only for JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists by username OR email
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [{ email }, { username }] 
      } 
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "Email already in use" });
      } else {
        return res.status(400).json({ error: "Username already in use" });
      }
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user & return JWT
 * @access  Public
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", { username });

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // Find user
    const user = await User.findOne({ where: { username } });
    console.log("User found:", user ? user.username : "None");

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const validPassword = bcrypt.compareSync(password, user.password);
    console.log("Password valid:", validPassword);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT (include role so middleware can check permissions)
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role || 'user'
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;