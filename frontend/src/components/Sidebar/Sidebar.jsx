// src/components/Sidebar/Sidebar.jsx
import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="portal-title">Alumni Portal</h2>

      <div className="profile-card">
        <div className="profile-pic-placeholder"></div>
        <h3>Jane Doe</h3>
        <p className="info">B.Tech 2022 | Software Engineer</p>
      </div>

      <nav className="nav-buttons">
        <button>🏠 Home</button>
        <button>📅 Events</button>
        <button>💬 Messages</button>
        <button>👤 Profile</button>
        <button>📊 Dashboard</button>
      </nav>

      <div className="logout-section">
        <button className="btn-logout">🚪 Logout</button>
      </div>
    </aside>
  );
}
