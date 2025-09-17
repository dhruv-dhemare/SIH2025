import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { getProfile } from "../services/api"; // your API call

export default function Profile() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // JWT from login
    if (!token) {
      setError("No token found. Please login.");
      return;
    }

    getProfile(token)
      .then((data) => {
        const u = data.user || {};

        // Construct a unified location string
        const location = Array.isArray(u.locations)
          ? u.locations.filter(Boolean).join(", ")
          : u.city || u.location || "";

        setUser({
          ...u,
          location,
          title: u.headline || u.designation || "",
          profilePhoto: u.profilePhoto || "",
          education: u.education || u.academics || [], // new field
        });

        setPosts(u.posts || []);
      })
      .catch((err) => setError(err.message || "Failed to load profile"));
  }, []);

  if (error)
    return (
      <div className="profile-page-container">
        <p>{error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="profile-page-container">
        <p>Loading...</p>
      </div>
    );

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div className="profile-page-container">
      {/* Title */}
      <h1 className="profile-page-title">Profile</h1>

      {/* Top Cards */}
      <div className="top-cards">
        {/* Profile Card */}
        <div className="card profile-page-card">
          
          <div className="profile-page-info">
            <h2 className="profile-page-name">{user.name}</h2>
            <p className="profile-page-desc">{user.title}</p>
            <p className="profile-page-detail">📍 {user.location}</p>
            <p className="profile-page-detail">📧 {user.email}</p>
          </div>
        </div>

        {/* About Card */}
        <div className="card about-card">
          <h3>About</h3>
          <p>{user.about || "No bio provided."}</p>
        </div>
      </div>

      {/* Posts Section */}
      <div className="card section-card">
        <div className="section-header">
          <h3>Posts</h3>
          <button className="btn" onClick={() => navigate("/addpost")}>
            + Add Post
          </button>
        </div>
        <div className="posts">
          {safeArray(posts).length === 0 && <p>No posts yet</p>}
          {safeArray(posts).map((post) => (
            <div key={post._id} className="post-card">
              {post.img && <img src={post.img} alt="Post" className="post-img" />}
              <p className="post-desc">{post.desc || post.content}</p>
            </div>
          ))}
        </div>
        {safeArray(posts).length > 0 && (
          <button className="btn view-more">View More</button>
        )}
      </div>

      {/* Experience */}
      <div className="card section-card">
        <h3>Experience</h3>
        <ul>
          {safeArray(user.experience).length > 0
            ? user.experience.map((exp, i) => <li key={i}>💼 {exp}</li>)
            : <li>No experience listed</li>}
        </ul>
      </div>

      {/* Education / Academics */}
      <div className="card section-card">
        <h3>Education</h3>
        <ul>
          {safeArray(user.education).length > 0
            ? user.education.map((edu, i) => (
                <li key={i}>🎓 {edu.degree || edu.course || edu.institution || edu}</li>
              ))
            : <li>No education listed</li>}
        </ul>
      </div>

      {/* Certifications */}
      <div className="card section-card">
        <h3>Certifications</h3>
        <ul>
          {safeArray(user.certification).length > 0
            ? user.certification.map((cert, i) => <li key={i}>✅ {cert}</li>)
            : <li>No certifications listed</li>}
        </ul>
      </div>

      {/* Skills */}
      <div className="card section-card">
        <h3>Skills</h3>
        <div className="skills">
          {safeArray(user.skills).length > 0
            ? user.skills.map((skill, idx) => (
                <span key={idx} className="skill">{skill}</span>
              ))
            : <span className="skill">No skills listed</span>}
        </div>
      </div>

      {/* Important URLs */}
      <div className="card section-card">
        <h3>Important URLs</h3>
        <ul>
          {safeArray(user.urls).length > 0
            ? user.urls.map((link, i) => (
                <li key={i}>
                  🔗 <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </li>
              ))
            : <li>No links provided</li>}
        </ul>
      </div>
    </div>
  );
}
