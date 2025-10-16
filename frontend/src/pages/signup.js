import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import "../styles/authStyles.css"; // Shared style
import Bubbles from "../components/bubbles";
import "@fontsource/raleway";
import { apiUrl } from "../api";

const Signup = () => {
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

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              required
              style={{ fontFamily: "Raleway" }}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              style={{ fontFamily: "Raleway" }}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              style={{ fontFamily: "Raleway" }}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" required />
          </div>

          <button className="auth-btn" style={{ backgroundColor: "#0AC7A1" }}>
            Signup
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

const handleSignup = async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch(apiUrl('/api/auth/register'), {
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
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Signup failed");
  }
};

export default Signup;
