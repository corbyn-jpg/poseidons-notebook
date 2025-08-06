import React from "react";
import { motion } from "framer-motion";
import "../styles/authStyles.css"; // Shared auth styles
import "@fontsource/barlow-semi-condensed";
import "@fontsource/raleway";

const Login = () => {
  return (
    <div className="auth-container">
      {/* Water ripple background */}
      <div className="water-bg">
        <div className="ripple"></div>
        <div className="ripple delay-1"></div>
        <div className="foam"></div>
      </div>

      {/* Auth card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card"
      >
        <img src="/logo.svg" alt="Poseidon's Notebook" className="logo" />

        <form>
          <div className="input-group">
            <label>Username</label>
            <input type="text" style={{ fontFamily: "Raleway" }} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" style={{ fontFamily: "Raleway" }} />
          </div>

          <input type="password" placeholder="Confirm Password" />
          <button style={{ backgroundColor: "#6EE4FF" }}>Sign Up</button>
          <p>
            Existing user? <a href="/login">Login</a>
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="auth-btn"
            style={{ backgroundColor: "#0AC7A1" }}
          >
            Login
          </motion.button>
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
