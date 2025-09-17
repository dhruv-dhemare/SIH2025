import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Home, Calendar, MessageSquare, BarChart3, Phone } from "lucide-react";
import "./Navbar.css";
import ProfileCard from "./ProfileCard.jsx";
import profileImg from "../assets/profile.jpg";
import { getProfile, logout as apiLogout } from "../services/api"; // import logout

function Navbar() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // for redirect after logout

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

  // Logout handler
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // call backend logout to blacklist token (optional)
        await apiLogout(token);
      }

      // remove token locally
      localStorage.removeItem("token");

      // redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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

        {/* Logout NavLink with onClick */}
        <div className="logout-btn" onClick={handleLogout} style={{ cursor: "pointer" }}>
          <LogOut className="logout-icon" />
          <span className="logout-text">Logout</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
