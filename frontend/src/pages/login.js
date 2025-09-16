import React from 'react';
import { motion } from 'framer-motion';
import logo from "../assets/logo.png"; 
import "../styles/authStyles.css"; // Shared style
import Bubbles from "../components/bubbles";
import '@fontsource/barlow-semi-condensed';
import '@fontsource/raleway';

const Login = () => {
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
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" style={{ fontFamily: 'Raleway' }} />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input type="password" style={{ fontFamily: 'Raleway' }} />
          </div>

          <button
            className="auth-btn"
            style={{ backgroundColor: '#0AC7A1' }}
          >
            Login
          </button>
        </form>

        <p className="auth-switch">
          New user? <a href="/signup" style={{ color: '#FF5C87' }}>Sign up</a>
        </p>
      </motion.div>
    </div>
  );
};

const handleLogin = async (e) => {
  e.preventDefault();

  const email = e.target[0].value; 
  const password = e.target[1].value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      // Save user info in localStorage or context
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login successful!");
      window.location.href = "/home";
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};

export default Login;