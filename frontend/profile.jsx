import { useState } from "react";
import "./Profile.css";

function Profile() {
  const [profilePic, setProfilePic] = useState(null);

 
  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-container">
      {/* Left section - Profile Picture */}
      <div className="profile-sidebar">
        <div className="profile-pic">
          {profilePic ? (
            <img src={profilePic} alt="Profile" />
          ) : (
            <span>👤</span>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handlePicUpload} />
      </div>

      {/* Right section - Details */}
      <div className="profile-main">
        <div className="profile-field">
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div className="profile-field">
          <label>About:</label>
          <textarea placeholder="Write something about yourself..." />
        </div>

        <div className="profile-field">
          <label>Description:</label>
          <textarea placeholder="Short description..." />
        </div>

        <div className="profile-field">
          <label>Education:</label>
          <input type="text" placeholder="Enter education details" />
        </div>

        <div className="profile-field">
          <label>Skills:</label>
          <input type="text" placeholder="List your skills" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
