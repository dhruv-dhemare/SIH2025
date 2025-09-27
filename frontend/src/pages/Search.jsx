// src/pages/Search.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import "../App.css";

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.toLowerCase() || "";

  // ✅ Hardcoded Alumni Profiles
  const alumniProfiles = [
    {
      id: 1,
      name: "Dr. Ramesh Kumar",
      role: "AI/ML Researcher • Batch 2005",
      avatar: "https://i.pravatar.cc/40?img=15",
      details: "Currently working at Google Research in deep learning and computer vision.",
    },
    {
      id: 2,
      name: "Sneha Gupta",
      role: "Data Scientist • Batch 2012",
      avatar: "https://i.pravatar.cc/40?img=32",
      details: "At Microsoft, leading projects in NLP and generative AI for enterprise solutions.",
    },
    {
      id: 3,
      name: "Amit Verma",
      role: "AI Engineer • Batch 2018",
      avatar: "https://i.pravatar.cc/40?img=45",
      details: "Working at Amazon Alexa on conversational AI and recommendation systems.",
    },
  ];

  // ✅ Hardcoded Events
  const eventPosts = [
    {
      id: 4,
      userName: "Hackathon Committee",
      userRole: "Event Organizers",
      avatar: "https://i.pravatar.cc/40?img=24",
      content: "National Level AI Hackathon coming up next month. Register now to showcase your skills!",
      image: "https://source.unsplash.com/400x200/?hackathon,ai",
    },
    {
      id: 5,
      userName: "SIG AI Club",
      userRole: "Student Innovation Group",
      avatar: "https://i.pravatar.cc/40?img=36",
      content: "Weekly AI/ML workshop series starting soon. Open to all batches.",
      image: "https://source.unsplash.com/400x200/?machinelearning,workshop",
    },
  ];

  // ✅ Hardcoded Opportunities
  const opportunities = [
    {
      id: 7,
      userName: "Infosys",
      userRole: "Hiring Team",
      avatar: "https://i.pravatar.cc/40?img=19",
      content: "AI/ML Internship openings for final-year students.",
      image: "https://source.unsplash.com/400x200/?internship,ai",
      apply: true, // ✅ Show Apply Now button
    },
    {
      id: 8,
      userName: "TCS Research",
      userRole: "Careers",
      avatar: "https://i.pravatar.cc/40?img=23",
      content: "Job opening: Research Associate in Artificial Intelligence.",
      image: "https://source.unsplash.com/400x200/?job,ai",
      apply: true,
    },
  ];

  // ✅ Recommended Communities
  const communities = [
    {
      id: 1,
      name: "AI/ML Club",
      members: "1.2k members",
      description: "Join discussions, projects, and hackathons in AI/ML.",
    },
    {
      id: 2,
      name: "Data Science SIG",
      members: "850 members",
      description: "Deep dive into Data Science with peers and mentors.",
    },
  ];

  return (
    <div className="search-results">
      <h2>
        Showing results for: <span style={{ color: "blue" }}>{query}</span>
      </h2>

      {/* ✅ Alumni Profiles */}
      <h3 style={{ color: "black" }}>🔹 Recommended Alumni</h3>
      <div className="alumni-list">
        {alumniProfiles.map((alumni) => (
          <div key={alumni.id} className="alumni-card">
            <img src={alumni.avatar} alt={alumni.name} className="alumni-avatar" />
            <div>
              <h4>{alumni.name}</h4>
              <p>{alumni.role}</p>
              <small>{alumni.details}</small>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Events */}
      <h3 style={{ color: "black" }}>🔹 AI/ML Related Events</h3>
      {eventPosts.map((event) => (
        <PostCard
          key={event.id}
          userName={event.userName}
          userRole={event.userRole}
          avatar={event.avatar}
          content={event.content}
          image={event.image}
        />
      ))}

      {/* ✅ Opportunities */}
      <h3 style={{ color: "black" }}>🔹 AI/ML Opportunities</h3>
      {opportunities.map((opp) => (
        <div key={opp.id} className="opportunity-card">
          <PostCard
            userName={opp.userName}
            userRole={opp.userRole}
            avatar={opp.avatar}
            content={opp.content}
            image={opp.image}
          />
          <button className="apply-btn">Apply Now</button>
        </div>
      ))}

      {/* ✅ Recommended Communities */}
      <h3 style={{ color: "black" }}>🔹 Recommended Communities</h3>
      <div className="community-list">
        {communities.map((c) => (
          <div key={c.id} className="community-card">
            <h4>{c.name}</h4>
            <p>{c.members}</p>
            <small>{c.description}</small>
            <button className="join-btn">Join Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
