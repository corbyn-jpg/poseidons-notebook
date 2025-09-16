import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"; 
import "../styles/authStyles.css"; // Shared style
import Bubbles from "../components/bubbles";
import "@fontsource/barlow-semi-condensed";
import "@fontsource/raleway";

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
            <input type="text" style={{ fontFamily: "Raleway" }} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" style={{ fontFamily: "Raleway" }} />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" />
          </div>

          <button
            className="auth-btn"
            style={{ backgroundColor: "#0AC7A1" }}
          >
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

  const username = e.target[0].value;
  const password = e.target[1].value;
  const confirmPassword = e.target[2].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email: `${username}@test.com`, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
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
