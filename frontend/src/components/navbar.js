import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import turtleIcon from "../assets/turtle.png";
import diverIcon from "../assets/diver.png";
import seashellIcon from "../assets/seashell.png";
import ContributionsIcon from "../assets/contributions.png";
import "../styles/titleWave.css";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/homePage" className="navbar-logo-link">
        <img src={logo} alt="Poseidon's Notebook" className="navbar-logo" />
        <div className="content">
          <h1>
            <span className="stroke-text">Poseidon's Notebook</span>
            <span className="fill-text">Poseidon's Notebook</span>
          </h1>
        </div>
      </Link>
      <nav>
        <ul className="animated-nav">
          <li>
            <Link to="/species" className="nav-link">
              <span className="icon">
                <img src={turtleIcon} alt="Species" className="nav-icon" />
              </span>
              <span className="title">Species</span>
            </Link>
          </li>
          <li>
            <Link to="/sightings" className="nav-link">
              <span className="icon">
                <img src={seashellIcon} alt="Sightings" className="nav-icon" />
              </span>
              <span className="title">Sightings</span>
            </Link>
          </li>
          <li>
            <Link to="/contributions" className="nav-link">
              <span className="icon">
                <img src={ContributionsIcon} alt="Contributions" className="nav-icon" />
              </span>
              <span className="title">Contributions</span>
            </Link>
          </li>
          <li>
            <Link to="/signup" className="nav-link">
              <span className="icon">
                <img src={diverIcon} alt="Signup" className="nav-icon" />
              </span>
              <span className="title">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;