import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=60",
    desc: "Excited to share my new MERN stack project! 🚀"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=900&q=60",
    desc: "Had a great experience at SIH 2025 hackathon."
  }
]);


  return (
    <div className="profile-page-container">
      {/* Title */}
      <h1 className="profile-page-title">Profile</h1>

      {/* Top Cards */}
      <div className="top-cards">
        {/* profile-page Card */}
        <div className="card profile-page-card">
          {/* <img
            src="https://via.placeholder.com/120"
            alt="profile-page"
            className="profile-page-pic"
          /> */}
          <div className="profile-page-info">
            <h2 className="profile-page-name">Disha Sharma</h2>
            <p className="profile-page-desc">Full Stack Developer | Alumni, XYZ University</p>
            <p className="profile-page-detail">📍 Bangalore, India</p>
            <p className="profile-page-detail">📧 disha@example.com</p>
          </div>
        </div>

        {/* About Card */}
        <div className="card about-card">
          <h3>About</h3>
          <p>
            Passionate developer with 3+ years of experience in building scalable web
            applications and contributing to open source projects.
          </p>
        </div>
      </div>

      {/* Posts */}
<div className="card section-card">
  <div className="section-header">
    <h3>Posts</h3>
    <button
          className="btn"
          onClick={() => navigate("/addpost")}
        >
          + Add Post
    </button>
  </div>
  <div className="posts">
    {posts.map((post) => (
      <div key={post.id} className="post-card">
        {post.img && <img src={post.img} alt="Post" className="post-img" />}
        <p className="post-desc">{post.desc || post.content}</p>
      </div>
    ))}
  </div>
  <button className="btn view-more">View More</button>
</div>


      {/* Experience */}
      <div className="card section-card">
        <h3>Experience</h3>
        <ul>
          <li>💼 Software Engineer at Microsoft (2023 - Present)</li>
          <li>💼 Intern at Google (2022)</li>
          <li>💼 Developer, XYZ University Club (2021)</li>
        </ul>
      </div>

      {/* Certifications */}
      <div className="card section-card">
        <h3>Certifications</h3>
        <ul>
          <li>✅ AWS Certified Solutions Architect</li>
          <li>✅ React Developer - Meta</li>
        </ul>
      </div>

      {/* Skills */}
      <div className="card section-card">
        <h3>Skills</h3>
        <div className="skills">
          {["React", "Node.js", "MongoDB", "CSS", "AWS"].map((skill, idx) => (
            <span key={idx} className="skill">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Important URLs */}
      <div className="card section-card">
        <h3>Important URLs</h3>
        <ul>
          <li>
            🔗 <a href="https://leetcode.com">LeetCode</a>
          </li>
          <li>
            🔗 <a href="https://github.com">GitHub</a>
          </li>
          <li>
            🔗 <a href="https://linkedin.com">LinkedIn</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
