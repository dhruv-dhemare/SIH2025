import React from "react";
import "./ProfileCard.css";

function ProfileCard({ name, title, location, profileImg }) {
  return (
    <div className="profile-card" role="region" aria-label="Profile card">
      <img src={profileImg} alt={name} className="profile-img" />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-title">{title}</p>
      <p className="profile-location">{location}</p>
    </div>
  );
}

export default ProfileCard;