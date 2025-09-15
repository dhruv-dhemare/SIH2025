import React from "react";
import { Link } from "react-router-dom"; // import Link
import "./Landing.css";
import logo_withoutbg from "../assets/logo_withoutbg.png"; // replace with your logo path
import bgImage from "../assets/bg.jpg"; // replace with your background image

export default function Landing() {
  return (
    <div className="landing" style={{ backgroundImage: `url(${bgImage})` }}>
      <nav className="navbar">
        <div className="nav-logo">
          <h2>The Alumni Society</h2>
        </div>
      </nav>

      <div className="slant-container">
        {/* Left Side (Text Section) */}
        <div className="left-section">
          <h1>Welcome to The Alumni Society's online platform!</h1>
          <Link to="/signup">
            <button className="join-btn">Join Now!</button>
          </Link>
        </div>

        {/* Right Side (Logo Section) */}
        <div className="right-section">
          <img
            src={logo_withoutbg}
            alt="The Alumni Society"
            className="hero-logo"
          />
        </div>
      </div>
    </div>
  );
}
