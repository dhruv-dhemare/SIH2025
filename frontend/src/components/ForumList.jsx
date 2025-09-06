

// src/components/ForumList.jsx
import React from "react";
import "./ForumList.css";

export default function ForumList({ items = [], query = "", onOpen }) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          (g.tag || "").toLowerCase().includes(q)
      )
    : items;

  if (filtered.length === 0) {
    return <div className="forum-empty">No communities found.</div>;
  }

  return (
    <ul className="forum-list">
      {filtered.map((forum) => (
        <li
          key={forum.id}
          className="forum-item"
          onClick={() => onOpen?.(forum)}
        >
          <div className="forum-row">
            <h4 className="forum-title">{forum.name}</h4>
            <span className="forum-time">{forum.lastActivity}</span>
          </div>
          <p className="forum-desc">
            {forum.members} members • {forum.category}
          </p>
          {forum.tag && (
            <div className="forum-tags">
              <span className="forum-tag">{forum.tag}</span>
              {forum.badge && (
                <span className="forum-tag highlight">{forum.badge}</span>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}