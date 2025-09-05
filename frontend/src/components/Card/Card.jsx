// src/components/Card.jsx
import React from "react";
import "./Card.css";

export default function PostCard({ post, onLike }) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">{post.author.charAt(0)}</div>
        <div>
          <h4>{post.author}</h4>
          <p className="role">{post.role}</p>
        </div>
      </div>
      <p className="post-content">{post.content}</p>
      <div className="post-actions">
        <button onClick={() => onLike(post.id)}>👍 Like</button>
        <span>{post.likes} Likes</span>
      </div>
    </div>
  );
}
