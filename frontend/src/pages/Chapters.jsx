import { useState } from "react";
import "./Chapters.css";

export default function Chapters() {
  const [chapters] = useState([
    {
      id: 1,
      name: "Batch-wise Chapters",
      description: "Connect with alumni from your graduation batch.",
      icon: "🎓",
    },
    {
      id: 2,
      name: "Location-wise Chapters",
      description: "Network with alumni based in your city or region.",
      icon: "📍",
    },
    {
      id: 3,
      name: "Department-wise Chapters",
      description: "Stay connected with peers from your department.",
      icon: "🏛️",
    },
    {
      id: 4,
      name: "Industry-wise Chapters",
      description: "Collaborate with alumni working in similar industries.",
      icon: "💼",
    },
  ]);

  return (
    <div className="chapters-container">
      <div className="chapters-wrapper">
        {/* Page Title */}
        <h1 className="chapters-title">Alumni Chapters</h1>
        <hr className="divider-alumni" />   

        <p className="chapters-subtitle">
          Stay connected with your chapter — collaborate on new opportunities, celebrate milestones, and strengthen bonds that last a lifetime.
        </p>

        {/* Chapters Grid */}
        <div className="chapters-grid">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="chapter-card">
              <div className="chapter-icon">{chapter.icon}</div>
              <h2 className="chapter-name">{chapter.name}</h2>
              <p className="chapter-description">{chapter.description}</p>
              <button className="chapter-button">Explore</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
