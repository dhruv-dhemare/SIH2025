import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Alumni Portal</p>
        <nav className="footer-links">
          <a href="/events">Events</a>
          <a href="/mentorship">Mentorship</a>
          <a href="/donations">Donations</a>
          <a href="/about">About</a>
        </nav>
      </div>
    </footer>
  );
}
