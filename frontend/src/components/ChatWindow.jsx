

import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import "./ChatWindow.css";

export default function ChatWindow({ chat, onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "System", text: "Hey there!", time: "10:00 AM", mine: false },
    { id: 2, sender: "You", text: "Hi! How are you?", time: "10:02 AM", mine: true },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mine: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Optional: simulate a reply from other user
    setTimeout(() => {
      const reply = {
        id: Date.now(),
        sender: "System",
        text: "Got it 👍",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mine: false,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h4>{chat?.name ?? "Chat"}</h4>
      </div>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m) => (
          <MessageBubble key={m.id} {...m} />
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