import React, { useState } from "react";
import "./LocationChapter.css";

function LocationChapter() {
  const [showMembers, setShowMembers] = useState(false);

  // Hardcoded member names (can be fetched later from backend)
  const members = [
    "Amit Sharma (CSE, 2018)",
    "Priya Verma (ECE, 2019)",
    "Rohit Mehra (IT, 2020)",
    "Sneha Kapoor (MBA, 2021)",
    "Arjun Nair (ME, 2017)",
  ];

const upcomingActivities = [
  {
    title: "Delhi Alumni Mixer",
    date: "15 Oct 2025",
    image: "https://example.com/delhi-mixer.jpg", // replace with your image URL
  },
  {
    title: "Tech Talk: AI in Startups",
    date: "28 Oct 2025",
    image: "https://example.com/ai-startups.jpg",
  },
];

const pastActivities = [
  {
    title: "Fundraising Dinner",
    date: "12 Aug 2025",
    image: "D:\sih2025\SIH2025\frontend\src\assets\delhievet.jpg",
  },
  {
    title: "Job Fair – Delhi NCR",
    date: "20 July 2025",
    image: "D:\sih2025\SIH2025\frontend\src\assets\delhievet.jpg",
  },
];


  return (
    <div className="chapter-container">
      <h1>Alumni Chapter – Delhi</h1>
      <p className="chapter-desc">
        Connect with alumni in Delhi, grow your network, and be part of local
        events, activities, and opportunities.
      </p>

      {/* Members Section */}
      <div
        className="members-card"
        onClick={() => setShowMembers(true)}
      >
        <h3>👥 Members</h3>
        <p>{members.length} members</p>
        <span className="view-more">Click to view</span>
      </div>

      {/* Modal for Members */}
      {showMembers && (
        <div className="modal-overlay" onClick={() => setShowMembers(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h2>Delhi Chapter Members</h2>
            <ul>
              {members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
            <button className="close-btn" onClick={() => setShowMembers(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Activities Section */}
      <div className="activities-section">
  <h2>📅 Upcoming Activities</h2>
  <ul>
    {upcomingActivities.map((activity, index) => (
      <li key={index} className="activity-item">
        <img src={activity.image} alt={activity.title} className="activity-image" />
        <div className="activity-info">
          <strong>{activity.title}</strong> – {activity.date}
        </div>
      </li>
    ))}
  </ul>

  <h2>✅ Past Activities</h2>
  <ul>
    {pastActivities.map((activity, index) => (
      <li key={index} className="activity-item">
        <img src={activity.image} alt={activity.title} className="activity-image" />
        <div className="activity-info">
          <strong>{activity.title}</strong> – {activity.date}
        </div>
      </li>
    ))}
  </ul>
</div>

    </div>
  );
}

export default LocationChapter;
