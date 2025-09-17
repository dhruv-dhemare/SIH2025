import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import "./ChatWindow.css";

export default function ChatWindow({ chat, onBack }) {
  const [messages, setMessages] = useState(chat.messages || []);
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

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Auto-reply
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        sender: chat.name,
        text: "Hello, nice to meet you! 👋",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mine: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 800);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h4>{chat.name}</h4>
        <span className="chat-role">{chat.role}</span>
      </div>

      <div className="chat-body">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} {...msg} />
        ))}
      </div>

      <div className="chat-footer">
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
