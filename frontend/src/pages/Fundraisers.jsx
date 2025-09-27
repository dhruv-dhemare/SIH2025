import "./Fundraisers.css";

export default function Fundraisers() {
  // Data remains the same as your original component
  const topChapters = {
    batch: [
      { title: "Batch 2010", amount: "₹1,50,000", icon: "🎓" },
      { title: "Batch 2012", amount: "₹1,20,000", icon: "🎓" },
      { title: "Batch 2015", amount: "₹1,10,000", icon: "🎓" },
    ],
    location: [
      { title: "Pune Chapter", amount: "₹1,50,000", icon: "📍" },
      { title: "Mumbai Chapter", amount: "₹1,20,000", icon: "📍" },
      { title: "Delhi Chapter", amount: "₹1,00,000", icon: "📍" },
    ],
    department: [{ title: "Computer Engineering", amount: "₹5,00,000", icon: "💻" }],
    industry: [{ title: "IT Industry Alumni", amount: "₹6,40,000", icon: "🏢" }],
  };

  const yourTotals = [
    { title: "Your Batch Total", amount: "₹1,20,000" },
    { title: "Your Location Total", amount: "₹95,000" },
    { title: "Your Department Total", amount: "₹1,80,000" },
    { title: "Your Industry Total", amount: "₹2,10,000" },
  ];

  const posts = [
    {
      title: "AI Lab Fundraising Event",
      description: "Join us in raising funds for the new AI lab. Your contribution will help set up state-of-the-art infrastructure.",
      date: "27 Sep 2025",
    },
    {
      title: "Alumni Meet & Fundraiser",
      description: "Reconnect with fellow alumni and contribute to student scholarships. Every contribution makes a difference!",
      date: "15 Oct 2025",
    },
    {
      title: "Library Expansion Campaign",
      description: "Help expand our library's resources and provide students with access to modern learning materials.",
      date: "01 Nov 2025",
    },
  ];

  const renderCategoryCard = (categoryTitle, items) => (
    <div className="fundraiser-card">
      <h3 className="card-title">{categoryTitle}</h3>
      <div className="category-items">
        {items.map((item, idx) => (
          <div key={idx} className="category-item">
            <span className="category-icon" aria-hidden="true">{item.icon}</span>
            <span className="category-title">{item.title}</span>
            <span className="category-amount">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Dashboard Stats */}
      <section className="dashboard-section">
        <h1 className="main-title">Fundraising Dashboard</h1>
        <p className="main-subtitle">Top contributing chapters across all categories</p>
        <hr className="divider" />
        <div className="grid two-column-grid">
          {renderCategoryCard("Top Batches", topChapters.batch)}
          {renderCategoryCard("Top Locations", topChapters.location)}
          {renderCategoryCard("Top Department", topChapters.department)}
          {renderCategoryCard("Top Industry", topChapters.industry)}
        </div>
      </section>

      {/* Your Contributions */}
      <section className="dashboard-section">
        <h2 className="section-title">Your Chapters Contributions</h2>
        <hr className="divider" />
        <div className="grid four-column-grid">
          {yourTotals.map((item, idx) => (
            <div key={idx} className="fundraiser-card summary-card">
              <h3 className="card-title-small">{item.title}</h3>
              <p className="summary-amount">{item.amount}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fundraising Posts */}
      <section className="dashboard-section">
        <h2 className="section-title">Active Fundraising Events</h2>
        <hr className="divider" />
        <div className="grid two-column-grid">
          {posts.map((post, idx) => (
            <div key={idx} className="fundraiser-card">
              <h3 className="card-title">{post.title}</h3>
              <p className="card-description">{post.description}</p>
              <p className="card-date">Date: {post.date}</p>
              <button className="card-button">Contribute Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}