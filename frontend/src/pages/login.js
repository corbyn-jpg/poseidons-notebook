import React from 'react';
import { motion } from 'framer-motion';
import logo from "../assets/logo.png"; 
import "../styles/authStyles.css";
import Bubbles from "../components/bubbles";
import '@fontsource/raleway';

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
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
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text"
              name="username"
              required
              style={{ fontFamily: 'Raleway' }}
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              required
              style={{ fontFamily: 'Raleway' }}
            />
          </div>

          <button
            className="auth-btn"
            style={{ backgroundColor: '#0AC7A1' }}
            type="submit"
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

export default Login;