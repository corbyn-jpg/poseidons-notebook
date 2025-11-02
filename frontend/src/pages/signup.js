import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import "../styles/authStyles.css"; // Shared style
import Bubbles from "../components/bubbles";
import "@fontsource/raleway";
import { apiUrl } from "../api";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    let issues = [];

    if (password.length >= minLength) strength += 1;
    else issues.push(`at least ${minLength} characters`);

    if (hasUpperCase) strength += 1;
    else issues.push("an uppercase letter");

    if (hasLowerCase) strength += 1;
    else issues.push("a lowercase letter");

    if (hasNumbers) strength += 1;
    else issues.push("a number");

    if (hasSpecialChar) strength += 1;
    else issues.push("a special character");

    return { strength, issues };
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const { strength } = validatePassword(password);
    
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (strength < 2) {
      setPasswordStrength("weak");
    } else if (strength < 4) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const validateForm = (username, email, password, confirmPassword) => {
    const newErrors = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (username.length > 30) {
      newErrors.username = "Username must not exceed 30 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      newErrors.username = "Username can only contain letters, numbers, hyphens, and underscores";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!password) {
      newErrors.password = "Password is required";
    } else if (passwordValidation.issues.length > 0) {
      newErrors.password = `Password must contain: ${passwordValidation.issues.join(", ")}`;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Clear previous errors
    setErrors({});

    // Validate form
    const formErrors = validateForm(username, email, password, confirmPassword);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(apiUrl('/auth/register'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = "/login"; // redirect
      } else {
        setErrors({ general: data.error || "Registration failed" });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Registration failed. Please check your connection and try again." });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <Bubbles />

      {/* Auth card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card"
      >
        <img src={logo} alt="Poseidon's Notebook" className="logo" />

        {errors.general && (
          <div className="error-message general-error">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              required
              minLength="3"
              maxLength="30"
              pattern="^[a-zA-Z0-9_-]+$"
              title="Username can only contain letters, numbers, hyphens, and underscores"
              className={errors.username ? "error" : ""}
              style={{ fontFamily: "Raleway" }}
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              className={errors.email ? "error" : ""}
              style={{ fontFamily: "Raleway" }}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              minLength="8"
              className={errors.password ? "error" : ""}
              onChange={handlePasswordChange}
              style={{ fontFamily: "Raleway" }}
            />
            {passwordStrength && (
              <div className={`password-strength ${passwordStrength}`}>
                Password strength: {passwordStrength}
              </div>
            )}
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              className={errors.confirmPassword ? "error" : ""}
              style={{ fontFamily: "Raleway" }}
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <button
            className="auth-btn"
            style={{ backgroundColor: "#0AC7A1" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Existing user?{" "}
          <a href="/login" style={{ color: "#FF5C87" }}>
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
