import { useState } from "react";

export default function Fundraiser() {
  // Mock data for demonstration
  const topChapters = [
    { title: "Top Batch Chapter", description: "Batch of 2010 raised ₹4,50,000", icon: "🎓" },
    { title: "Top Location Chapter", description: "Pune Chapter raised ₹3,20,000", icon: "📍" },
    { title: "Top Department Chapter", description: "Computer Engineering raised ₹5,00,000", icon: "💻" },
    { title: "Top Industry Chapter", description: "IT Industry Alumni raised ₹6,40,000", icon: "🏢" },
  ];

  const yourTotals = [
    { title: "Your Batch Total Donation", amount: "₹1,20,000" },
    { title: "Your Location Chapter Donation", amount: "₹95,000" },
    { title: "Your Department Donation", amount: "₹1,80,000" },
    { title: "Your Industry Donation", amount: "₹2,10,000" },
  ];

  const posts = [
    {
      title: "AI Lab Fundraising Event",
      description: "Join us in raising funds for the new AI lab at PICT. Contributions will help set up state-of-the-art infrastructure.",
      date: "27 Sep 2025",
    },
    {
      title: "Alumni Meet & Fundraiser",
      description: "Reconnect with alumni and contribute to student scholarships. Every contribution counts!",
      date: "15 Oct 2025",
    },
    {
      title: "Library Expansion Campaign",
      description: "Help expand our library resources and provide students access to modern learning materials.",
      date: "01 Nov 2025",
    },
  ];

  return (
    <div className="chapters-container">
      {/* Title */}
      <h1 className="chapters-title">Fundraising Dashboard</h1>
      <p className="chapters-subtitle">Track chapter contributions and explore fundraising events</p>
      <hr className="divider-alumni" />

      {/* Top Chapters Stats */}
      <div className="chapters-grid">
        {topChapters.map((item, idx) => (
          <div key={idx} className="chapter-card">
            <div className="chapter-icon">{item.icon}</div>
            <h3 className="chapter-name">{item.title}</h3>
            <p className="chapter-description">{item.description}</p>
            <button className="chapter-button">View Details</button>
          </div>
        ))}
      </div>

      {/* Your Personal Totals */}
      <h2 className="chapters-title" style={{ marginTop: "40px" }}>Your Chapter Contributions</h2>
      <hr className="divider-alumni" />
      <div className="chapters-grid">
        {yourTotals.map((item, idx) => (
          <div key={idx} className="chapter-card">
            <h3 className="chapter-name">{item.title}</h3>
            <p className="chapter-description text-lg font-bold">{item.amount}</p>
          </div>
        ))}
      </div>

      {/* Fundraising Posts */}
      <h2 className="chapters-title" style={{ marginTop: "40px" }}>Fundraising Events</h2>
      <hr className="divider-alumni" />
      <div className="chapters-grid">
        {posts.map((post, idx) => (
          <div key={idx} className="chapter-card">
            <h3 className="chapter-name">{post.title}</h3>
            <p className="chapter-description">{post.description}</p>
            <p className="chapter-description font-semibold mt-2">Date: {post.date}</p>
            <button className="chapter-button">Contribute</button>
          </div>
        ))}
      </div>
    </div>
  );
}
