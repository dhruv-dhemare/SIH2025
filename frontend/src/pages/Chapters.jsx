import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chapters.css";

export default function Chapters() {
  const navigate = useNavigate();

  const [chapters] = useState([
    {
      id: 1,
      name: "Batch of 2015",
      description: "Connect with alumni from your graduation batch.",
      members: 120,
      representative: "John Doe",
      icon: "🎓",
    },
    {
      id: 2,
      name: "Location: New York",
      description: "Network with alumni based in New York.",
      members: 80,
      representative: "Jane Smith",
      icon: "📍",
    },
    {
      id: 3,
      name: "Department: Computer Science",
      description: "Stay connected with peers from CS department.",
      members: 150,
      representative: "Alice Johnson",
      icon: "🏛️",
    },
    {
      id: 4,
      name: "Industry: Tech",
      description: "Collaborate with alumni working in tech industry.",
      members: 95,
      representative: "Bob Williams",
      icon: "💼",
    },
  ]);

  return (
    <div className="chapters-container">
      <div className="chapters-wrapper">
        <h1 className="chapters-title">Alumni Chapters</h1>
        <hr className="divider-alumni" />   
        <p className="chapters-subtitle">
          Stay connected with your chapter — collaborate on opportunities, celebrate milestones, and strengthen bonds.
        </p>

        <div className="chapters-grid">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="chapter-card"
              onClick={() => navigate("/chapters/delhi")}  // ✅ Direct all cards to Delhi page
            >
              <div className="chapter-icon">{chapter.icon}</div>
              <h2 className="chapter-name">{chapter.name}</h2>
              <p className="chapter-description">{chapter.description}</p>
              <p className="chapter-members">Members: {chapter.members}</p>
              <p className="chapter-rep">Representative: {chapter.representative}</p>
              <button className="chapter-button">Explore</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
