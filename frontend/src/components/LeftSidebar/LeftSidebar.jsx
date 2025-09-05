import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./LeftSidebar.css";

export default function LeftSidebar() {
  const { pathname } = useLocation();

  const NavBtn = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`ls-navbtn ${pathname === to ? "active" : ""}`}
      aria-label={label}
    >
      <span className="ls-ico">{icon}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <aside className="left-sidebar ls-elevate">
      <h2 className="portal-title">Alumni Portal</h2>

      <div className="profile-card">
        {/* Placeholder image; replace with user photo later */}
        <div className="profile-pic-placeholder" aria-hidden="true"></div>
        <h3>Jane Doe</h3>
        <p className="info">B.Tech 2022 • Software Engineer</p>
      </div>

      <nav className="nav-buttons">
        <NavBtn to="/" icon="🏠" label="Home" />
        <NavBtn to="/events" icon="📅" label="Events" />
        <NavBtn to="/messages" icon="💬" label="Messages" />
        <NavBtn to="/dashboard" icon="📊" label="Dashboard" />
      </nav>

      <div className="logout-section">
        <button className="logout-btn">🚪 Logout</button>
      </div>
    </aside>
  );
}
