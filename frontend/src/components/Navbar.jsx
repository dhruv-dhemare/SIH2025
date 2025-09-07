import React from "react";
import { NavLink } from "react-router-dom";  // ✅ use NavLink
import "./Navbar.css";
import ProfileCard from "./ProfileCard.jsx";
import profileImg from "../assets/profile.jpg";

function Navbar() {
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
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Events
        </NavLink>
        <NavLink to="/messages" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Messages
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Analytics
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
