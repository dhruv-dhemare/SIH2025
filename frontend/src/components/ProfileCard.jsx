import React from "react";
import { useLocation } from "react-router-dom";
import "./ProfileCard.css";

function ProfileCard({ name, title, location, profileImg }) {
  const { pathname } = useLocation();
  const isProfilePage = pathname === "/profile";

  return (
    <div
      className={`profile-card ${isProfilePage ? "profile-page" : ""}`}
      role="region"
      aria-label="Profile card"
    >
      <img
        src={profileImg}
        alt={name}
        className={`profile-img ${isProfilePage ? "large" : ""}`} // ✅ add "large"
      />

      {!isProfilePage && (
        <>
          <h2 className="profile-name">{name}</h2>
          <p className="profile-title">{title}</p>
          <p className="profile-location">{location}</p>
        </>
      )}
    </div>
  );
}

export default ProfileCard;
