import React from "react";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import "./Search.css";

function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.toLowerCase() || "";

  const alumniProfiles = [
    { id: 1, name: "Dr. Ramesh Kumar", role: "AI/ML Researcher • Batch 2005", avatar: "https://i.pravatar.cc/40?img=15", details: "Currently at Google Research in deep learning and computer vision." },
    { id: 2, name: "Sneha Gupta", role: "Data Scientist • Batch 2012", avatar: "https://i.pravatar.cc/40?img=32", details: "At Microsoft, leading projects in NLP and generative AI." },
    { id: 3, name: "Amit Verma", role: "AI Engineer • Batch 2018", avatar: "https://i.pravatar.cc/40?img=45", details: "Working at Amazon Alexa on conversational AI systems." },
  ];

  const eventPosts = [
    { id: 4, userName: "Hackathon Committee", userRole: "Event Organizers", avatar: "https://i.pravatar.cc/40?img=24", content: "National Level AI Hackathon coming up next month.", image: "https://framerusercontent.com/assets/8zE1cw2uW0PtSANxYynp9aKnnP8.png" },
    { id: 5, userName: "SIG AI Club", userRole: "Student Innovation Group", avatar: "https://i.pravatar.cc/40?img=36", content: "Weekly AI/ML workshop series starting soon.", image: "https://cdn.eventespresso.com/wp-content/uploads/2023/08/01074844/Workshop-Ideas-Image-Man-2048x1152.jpg" },
  ];

  const opportunities = [
    { id: 7, userName: "Infosys", userRole: "Hiring Team", avatar: "https://i.pravatar.cc/40?img=19", content: "AI/ML Internship openings for final-year students.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=60", apply: true },
    { id: 8, userName: "TCS Research", userRole: "Careers", avatar: "https://i.pravatar.cc/40?img=23", content: "Job opening: Research Associate in AI.", image: "https://cdn.dribbble.com/users/6836094/screenshots/14987655/media/6927a978ece13f39080a16c9282c2d35.png?compress=1&resize=1600x1200&vertical=top", apply: true },
  ];

  const communities = [
    { 
      id: 1, 
      name: "AI/ML Club", 
      members: "1.2k members", 
      description: "Join a vibrant community of enthusiasts and professionals exploring Artificial Intelligence and Machine Learning. Participate in hackathons, contribute to open-source projects, attend expert talks, and collaborate on innovative AI solutions." 
    },
    { 
      id: 2, 
      name: "Data Science SIG", 
      members: "850 members", 
      description: "Dive deep into the world of Data Science with peers and mentors. Engage in study groups, hands-on workshops, real-world case studies, and career mentorship to sharpen your analytical and problem-solving skills while building impactful projects." 
    }
  ];

  return (
    <div className="search-results">
      <h2 style={{ color: "black" }}>
  Showing results for:{" "}
  <span style={{ color: "blue" }}>
    {query.charAt(0).toUpperCase() + query.slice(1)}
  </span>
</h2>

      {/* Alumni */}
      <section>
        <h3 className="section-title">🔹 Recommended Alumni</h3>
        <div className="alumni-list">
          {alumniProfiles.map(alumni => (
            <div key={alumni.id} className="alumni-card">
              <img src={alumni.avatar} alt={alumni.name} className="alumni-avatar" />
              <div className="alumni-info">
                <h4>{alumni.name}</h4>
                <p className="role">{alumni.role}</p>
                <small>{alumni.details}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* Events */}
<section className="events-section">
  <h3 className="section-title">🔹 AI/ML Related Events</h3>
  <div className="events-grid">
    {eventPosts.map(event => (
      <PostCard
        key={event.id}
        userName={event.userName}
        userRole={event.userRole}
        avatar={event.avatar}
        content={event.content}
        image={event.image}
      />
    ))}
  </div>
</section>

{/* Opportunities */}
<section className="event-section">
  <h3 className="section-title">🔹 AI/ML Opportunities</h3>
  <div className="events-grid">
    {opportunities.map(opp => (
        <PostCard
          userName={opp.userName}
          userRole={opp.userRole}
          avatar={opp.avatar}
          content={opp.content}
          image={opp.image}
        />
    ))}
  </div>
</section>


      {/* Communities */}
      <section>
        <h3 className="section-title">🔹 Recommended Communities</h3>
        <div className="community-list">
          {communities.map(c => (
            <div key={c.id} className="community-card">
              <h3>{c.name}</h3>
              <p className="members">{c.members}</p>
              <small>{c.description}</small><br />
              <center><button className="join-btn">Join Now</button></center>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Search;