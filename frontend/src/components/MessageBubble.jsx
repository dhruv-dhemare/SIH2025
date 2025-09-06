// src/components/ChatWindow/MessageBubble.jsx
import React from "react";
import "./MessageBubble.css";

export default function MessageBubble({ text, sender, time, mine }) {
  return (
    <div className={`message-bubble ${mine ? "own" : ""}`}>
      {!mine && <div className="message-sender">{sender}</div>}
      <div className="message-text">{text}</div>
      <div className="message-time">{time}</div>
    </div>
  );
}