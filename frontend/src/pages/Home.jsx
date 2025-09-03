import React, { useState } from "react";
import "./Home.css";


export default function Home() {
  const [filters, setFilters] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "John Doe",
      role: "Software Engineer @ Google",
      content: "Excited to announce the AI/ML mentorship program is live!",
      domain: "AI/ML",
      likes: 12,
    },
    {
      id: 2,
      author: "Priya Sharma",
      role: "Product Manager @ Microsoft",
      content: "Business leadership summit happening next week! 🚀",
      domain: "Business",
      likes: 8,
    },
    {
      id: 3,
      author: "Amit Patel",
      role: "Data Scientist @ Amazon",
      content: "Sharing my journey into Data Science for young alumni.",
      domain: "AI/ML",
      likes: 20,
    },
  ]);

  const toggleFilter = (filter) => {
    setFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredPosts =
    filters.length === 0
      ? posts
      : posts.filter((p) => filters.includes(p.domain));

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const toggleDropdown = (section) => {
    setOpenFilter(openFilter === section ? null : section);
  };

  return (
    <>
      <div className="home-container">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <h2 className="portal-title">Alumni Portal</h2>

          <div className="profile-card">
            <div className="profile-pic-placeholder"></div>
            <h3>Jane Doe</h3>
            <p className="info">B.Tech 2022 | Software Engineer</p>
          </div>

          <nav className="nav-buttons">
            <button>🏠 Home</button>
            <button>📅 Events</button>
            <button>💬 Messages</button>
            <button>👤 Profile</button>
            <button>📊 Dashboard</button>
          </nav>

          <div className="logout-section">
            <button className="btn-logout">🚪 Logout</button>
          </div>
        </aside>

        {/* Middle Feed */}
        <main className="feed">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-avatar"></div>
                <div>
                  <h4>{post.author}</h4>
                  <p className="role">{post.role}</p>
                </div>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-actions">
                <button onClick={() => handleLike(post.id)}>👍 Like</button>
                <span>{post.likes} Likes</span>
              </div>
            </div>
          ))}
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <h3>Trending Topics</h3>
          <ul>
            <li>#AI Revolution</li>
            <li>#StartupFunding</li>
            <li>#MentorshipMatters</li>
          </ul>

          
          

          {/* Dropdown Filters */}
          <div className="filters">
            <h4>Filters</h4>

            <div className="filter-dropdown">
              <button onClick={() => toggleDropdown("domain")}>
                Domains ⬇
              </button>
              {openFilter === "domain" && (
                <div className="filter-options">
                  {["AI/ML", "Business", "Data Science", "Entrepreneurship"].map(
                    (f) => (
                      <label key={f}>
                        <input
                          type="checkbox"
                          checked={filters.includes(f)}
                          onChange={() => toggleFilter(f)}
                        />
                        {f}
                      </label>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="filter-dropdown">
              <button onClick={() => toggleDropdown("engagement")}>
                Engagement ⬇
              </button>
              {openFilter === "engagement" && (
                <div className="filter-options">
                  {["Trending", "Most Liked", "Recent"].map((f) => (
                    <label key={f}>
                      <input
                        type="checkbox"
                        checked={filters.includes(f)}
                        onChange={() => toggleFilter(f)}
                      />
                      {f}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

     
    </>
  );
}

