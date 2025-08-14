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

        <form>
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

export default Signup;
