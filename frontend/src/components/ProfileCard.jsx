import React from "react";
import { useLocation } from "react-router-dom";
import "./ProfileCard.css";

function ProfileCard({ name, title, location, profileImg, onClick }) {
  const { pathname } = useLocation();
  const isProfilePage = pathname === "/profile";

  return (
    <div
      className={`profile-card ${isProfilePage ? "profile-page" : ""}`}
      role="region"
      aria-label="Profile card"
      onClick={onClick}          // ✅ forward click here
      style={{ cursor: onClick ? "pointer" : "default" }} // show pointer if clickable
    >
      <img
        src={profileImg}
        alt={name}
        className={`profile-img ${isProfilePage ? "large" : ""}`}
      />

      {!isProfilePage && (
        <>
          <h2 className="profile-name">{name}</h2>
          <hr
            className="divider-contact"
            style={{
              margin: "0px",
              padding: "0px",
              border: "none",
              height: "2px",
              backgroundColor: "#045233",
            }}
          />
          <p className="profile-title">{title}</p>
          <p className="profile-location">{location}</p>
        </>
      )}
    </div>
  );
}

export default ProfileCard;
