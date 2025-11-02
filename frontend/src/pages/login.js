import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import "../styles/authStyles.css";
import Bubbles from "../components/bubbles";
import "@fontsource/raleway";
import { apiUrl } from "../api";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (username, password) => {
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

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    // Clear previous errors
    setErrors({});

    // Validate form
    const formErrors = validateForm(username, password);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(apiUrl('/auth/login'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/homePage";
      } else {
        setErrors({ general: data.error || "Login failed" });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Login failed. Please check your connection and try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Bubbles />

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

        <form onSubmit={handleLogin}>
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
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              minLength="6"
              className={errors.password ? "error" : ""}
              style={{ fontFamily: "Raleway" }}
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <button
            className="auth-btn"
            style={{ backgroundColor: "#0AC7A1" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          New user?{" "}
          <a href="/signup" style={{ color: "#FF5C87" }}>
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
