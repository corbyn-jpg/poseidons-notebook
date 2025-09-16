import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import turtleIcon from "../assets/turtle.png";
import diverIcon from "../assets/diver.png";
import seashellIcon from "../assets/seashell.png";
import "../styles/titleWave.css";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo-link">
        <img src={logo} alt="Poseidon's Notebook" className="navbar-logo" />
        <div className="content">
          <h1>
            <span className="stroke-text">Poseidon's Notebook</span>
            <span className="fill-text">Poseidon's Notebook</span>
          </h1>
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/logs">
              <img src={seashellIcon} alt="Logs" className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/database">
              <img src={turtleIcon} alt="Species" className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <img src={diverIcon} alt="Signup" className="nav-icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
