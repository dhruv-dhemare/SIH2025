import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar animate-slideDown">
      <div className="nav-container">
        {/* Left: Project Title */}
        <a href="/home" className="nav-logo">
          Alumni Portal
        </a>

        {/* Mobile Hamburger */}
        <button
          className={`nav-toggle ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Right: Logout */}
        <div className={`nav-right ${isOpen ? "active" : ""}`}>
          <a href="/logout" className="btn-logout">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
