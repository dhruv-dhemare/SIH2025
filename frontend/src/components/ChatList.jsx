// src/components/ChatList.jsx
import React from "react";
import "./ChatList.css";

export default function ChatList({ items = [], query = "", onSelect }) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.lastMessage || "").toLowerCase().includes(q)
      )
    : items;

  return (
    <ul className="chat-list">
      {filtered.map((c) => (
        <li
          key={c.id}
          className={`chat-item ${c.unread ? "unread" : ""}`}
          onClick={() => onSelect?.(c)}
        >
          <div className="chat-avatar">{c.name.charAt(0)}</div>
          <div className="chat-content">
            <div className="chat-row">
              <span className="chat-name">{c.name}</span>
              <span className="chat-time">{c.time}</span>
            </div>
            <div className="chat-row">
              <span className="chat-last">{c.lastMessage}</span>
              {c.unreadCount > 0 && (
                <span className="chat-badge">{c.unreadCount}</span>
              )}
            </div>
          </div>
        </li>
      ))}
      {filtered.length === 0 && <li className="chat-empty">No chats found.</li>}
    </ul>
  );
}