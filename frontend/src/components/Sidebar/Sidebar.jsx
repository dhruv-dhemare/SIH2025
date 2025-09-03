import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/alumni">Alumni</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/mentorship">Mentorship</Link></li>
      </ul>
    </aside>
  );
}
