import React from "react";
import "./Navbar.css";
import ProfileCard from "./ProfileCard.jsx";
import profileImg from "../assets/profile.jpg";

function Navbar({ onSelectPage, selectedPage }) {   // ✅ accept props
  return (
    <nav className="navbar-vertical" aria-label="Main sidebar">
      <div className="site-header">
        <span className="site-title">AlmaMatter</span>
      </div>

      <div className="top-spacer"></div>

      <div className="profile-wrapper">
        <ProfileCard
          name="Dhruv Dhemare"
          title="FullStack Engineer | AI/ML Enthusiast"
          location="Pune, India"
          profileImg={profileImg}
        />
      </div>

      <div className="spacer" />

      <div className="nav-links">
        <button
          className={`nav-link ${selectedPage === "home" ? "active" : ""}`}
          onClick={() => onSelectPage("home")}
        >
          Home
        </button>
        <button
          className={`nav-link ${selectedPage === "events" ? "active" : ""}`}
          onClick={() => onSelectPage("events")}
        >
          Events
        </button>
        <button
          className={`nav-link ${selectedPage === "messages" ? "active" : ""}`}
          onClick={() => onSelectPage("messages")}
        >
          Messages
        </button>
        <button
          className={`nav-link ${selectedPage === "analytics" ? "active" : ""}`}
          onClick={() => onSelectPage("analytics")}
        >
          Analytics
        </button>
        <button
          className={`nav-link ${selectedPage === "contact" ? "active" : ""}`}
          onClick={() => onSelectPage("contact")}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
