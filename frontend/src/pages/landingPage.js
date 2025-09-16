// LandingPage.js
import Bubbles from "../components/bubbles";
import Card from "../components/card";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import "../styles/landingPage.css";
import heroImage from "../assets/heroImage.gif";
import LogSightings from "../assets/LogSightings.jpeg";
import TrackSpecies from "../assets/TrackSpecies.jpeg";
import Science from "../assets/Science.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import diverIcon from "../assets/diver.png";
import "../styles/titleWave.css";
import "../styles/navbar.css";
import "@fontsource/raleway";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Bubbles />
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
              <Link to="/signup">
                <img src={diverIcon} alt="Signup" className="nav-icon" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <HeroSection
        backgroundImage={heroImage}
        title="Discover the Depths"
        description="Log sightings, track species, and contribute to marine science."
        buttonText="Get Started"
        buttonLink="/signup"
      />

      <div className="value-props">
        <Card
          image={LogSightings}
          title="Log Sightings"
          description="Record marine life encounters in seconds."
        />
        <Card
          image={TrackSpecies}
          title="Track Species"
          description="Build your personal species database."
        />
        <Card
          image={Science}
          title="Contribute to Science"
          description="Share anonymized data with researchers."
        />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
