import React from "react";
import { Link } from "react-router-dom";
import FackebookIcon from "../assets/facebook.png";
import TwitterIcon from "../assets/twitter.png";
import InstagramIcon from "../assets/instagram.png";
import TiktokIcon from "../assets/tik-tok.png";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-section">
        <h4>Explore</h4>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/species">Species Database</Link>
          </li>
          <li>
            <Link to="/maps">Dive Maps</Link>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Resources</h4>
        <ul>
          <li>
            <a
              href="https://kirstenboschbookshop.co.za/product-category/books/marine/"
              rel="noreferrer"
              target="_blank"
            >
              Marine Life Guides
            </a>
          </li>
          <li>
            <a
              href="https://www.oceans-research.com/protecting-oceans-10-ways-to-contribute/"
              rel="noreferrer"
              target="_blank"
            >
              Conservation Tips
            </a>
          </li>
          <li>
            <a
              href="https://saambr.org.za/oceanographic-research-institute-ori/"
              rel="noreferrer"
              target="_blank"
            >
              Research Partners
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Legal</h4>
        <ul>
          <li>
            <Link to="/terms">Terms of Service</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/cookies">Cookie Policy</Link>
          </li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Socials</h4>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/theopenwindow/"
              rel="noreferrer"
              target="_blank"
            >
              <img src={FackebookIcon} alt="Facebook" className="footer-icon" />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/open_window_?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              rel="noreferrer"
              target="_blank"
            >
              <img src={TwitterIcon} alt="Twitter" className="footer-icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/openwindowinstitute/?hl=en"
              rel="noreferrer"
              target="_blank"
            >
              <img
                src={InstagramIcon}
                alt="Instagram"
                className="footer-icon"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@open_window_"
              rel="noreferrer"
              target="_blank"
            >
              <img src={TiktokIcon} alt="Tiktok" className="footer-icon" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
