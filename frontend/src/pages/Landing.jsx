import React from "react";
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
        {/* <div className="nav-links">
          <a href="/">Home</a>
          <a href="/login">Login</a>
        </div> */}
      </nav>

      <div className="slant-container">
        {/* Left Side (Text Section) */}
        <div className="left-section">
          <h1>Welcome to The Alumni Society's online platform!</h1>
          {/* <p>
            Join us for news, networking, career resources, reunions, and more.
          </p> */}
          <button className="join-btn">Join Now!</button>
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
