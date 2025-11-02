// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Op } = require("sequelize");

// Use environment variable only for JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

// Validation functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateUsername = (username) => {
  if (!username || typeof username !== 'string') return false;
  if (username.length < 3 || username.length > 30) return false;
  return /^[a-zA-Z0-9_-]+$/.test(username);
};

const validatePassword = (password) => {
  if (!password || typeof password !== 'string') return { valid: false, message: "Password is required" };
  if (password.length < 8) return { valid: false, message: "Password must be at least 8 characters long" };
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const missingRequirements = [];
  if (!hasUpperCase) missingRequirements.push("an uppercase letter");
  if (!hasLowerCase) missingRequirements.push("a lowercase letter");
  if (!hasNumbers) missingRequirements.push("a number");
  if (!hasSpecialChar) missingRequirements.push("a special character");
  
  if (missingRequirements.length > 0) {
    return { 
      valid: false, 
      message: `Password must contain: ${missingRequirements.join(", ")}`
    };
  }
  
  return { valid: true };
};

// Sanitize input function
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    let { username, email, password, confirmPassword } = req.body;

    // Sanitize inputs
    username = sanitizeInput(username);
    email = sanitizeInput(email);

    // Basic required field validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Username validation
    if (!validateUsername(username)) {
      return res.status(400).json({ 
        error: "Username must be 3-30 characters and contain only letters, numbers, hyphens, and underscores" 
      });
    }

    // Email validation
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Please enter a valid email address" });
    }

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ error: passwordValidation.message });
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user exists by username OR email
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [{ email: email.toLowerCase() }, { username }] 
      } 
    });
    
    if (existingUser) {
      if (existingUser.email.toLowerCase() === email.toLowerCase()) {
        return res.status(400).json({ error: "Email already in use" });
      } else {
        return res.status(400).json({ error: "Username already in use" });
      }
    }

    // Hash password
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
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
    let { username, password } = req.body;
    
    // Sanitize inputs
    username = sanitizeInput(username);

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Username validation
    if (!validateUsername(username)) {
      return res.status(400).json({ error: "Invalid username format" });
    }

    // Find user
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;