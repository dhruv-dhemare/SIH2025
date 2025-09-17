import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  MessageSquare,
  BarChart3,
  Phone,
} from "lucide-react"; // ✅ lucide icons
import "./Navbar.css";
import ProfileCard from "./ProfileCard.jsx";
import profileImg from "../assets/profile.jpg";
import { getProfile } from "../services/api";

function Navbar() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    getProfile(token)
      .then((data) => {
        const u = data.user;
        if (!u) {
          setError("User data not found");
          setLoading(false);
          return;
        }

        const mappedUser = {
          name: u.name || "Unnamed",
          title: u.headline || "",
          location: u.locations ? u.locations.filter(Boolean).join(", ") : "",
          profileImg: profileImg,
        };

        setUser(mappedUser);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load profile");
        setLoading(false);
      });
  }, []);

  if (error) {
    console.error(error);
  }

  return (
    <nav className="navbar-vertical" aria-label="Main sidebar">
      <div className="site-header">
        <span className="site-title">The Alumni Society</span>
      </div>

      <div className="top-spacer"></div>

      <div className="profile-wrapper">
        <NavLink
          to="/profile"
          className="profile-link-div"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {loading ? (
            <ProfileCard
              name="Loading..."
              title=""
              location=""
              profileImg={profileImg}
            />
          ) : (
            <ProfileCard
              name={user?.name || "Unnamed"}
              title={user?.title || ""}
              location={user?.location || ""}
              profileImg={user?.profileImg || profileImg}
            />
          )}
        </NavLink>
      </div>

      <div className="nav-links">
        <NavLink
          to="/home"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <Home /> Home
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <Calendar /> Events
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <MessageSquare /> Messages
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <BarChart3 /> Analytics
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <Phone /> Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
