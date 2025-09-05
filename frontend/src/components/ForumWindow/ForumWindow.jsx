import React, { useState } from "react";
import MessageBubble from "../ChatWindow/MessageBubble";
import "./ForumWindow.css";

export default function ForumWindow({ forum, onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Moderator", text: "Welcome to the forum!", time: "9:00 AM", mine: false },
    { id: 2, sender: "You", text: "Excited to be here 🎉", time: "9:05 AM", mine: true },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: "You",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mine: true,
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="forum-window">
      <div className="forum-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h4>{forum.name}</h4>
      </div>

      <div className="forum-body">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
      </div>

      <div className="forum-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
