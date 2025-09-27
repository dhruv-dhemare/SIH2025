import "./Fundraisers.css";

export default function Fundraisers() {
  // Data remains the same as your original component
  const topChapters = {
    batch: [
      { title: "Batch 2025", amount: "₹1,50,000", icon: "🎓" },
      { title: "Batch 2012", amount: "₹1,20,000", icon: "🎓" },
      { title: "Batch 1999", amount: "₹1,10,000", icon: "🎓" },
    ],
    location: [
      { title: "Pune Chapter", amount: "₹1,50,000", icon: "📍" },
      { title: "Mumbai Chapter", amount: "₹1,20,000", icon: "📍" },
      { title: "Delhi Chapter", amount: "₹1,00,000", icon: "📍" },
    ],
    department: [{ title: "Computer Department", amount: "₹5,00,000", icon: "💻" }],
    industry: [{ title: "Finance Industry Alumni", amount: "₹6,40,000", icon: "🏢" }],
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
    images: [
       "https://adrtechindia.com/wp-content/uploads/2024/06/Setting-Up-an-artificial-intelligence-and-Machine-Learning-Lab-in-India.jpg",
      "https://img.freepik.com/premium-photo/artificial-intelligence-integration-modern-laboratory-enhancing-human-robot-collaboration_1022111-1908.jpg",
      "https://aida.wpcarey.asu.edu/sites/default/files/2023-10/ai-bg-home-hero.jpg"
    ]
  },
  {
    title: "Alumni Meet & Fundraiser",
    description: "Reconnect with fellow alumni and contribute to student scholarships. Every contribution makes a difference!",
    date: "15 Oct 2025",
    images: [
      "https://www.archmorebusinessweb.com/wp-content/uploads/2023/01/meetup-review_img.jpg",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60"
    ]
  },
  {
    title: "Library Expansion Campaign",
    description: "Help expand our library's resources and provide students with access to modern learning materials.",
    date: "01 Nov 2025",
    images: [
      "https://images.pexels.com/photos/270571/pexels-photo-270571.jpeg?cs=srgb&dl=bookcase-books-bookshelves-270571.jpg&fm=jpg",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=60"
    ]
  }
];


  const renderCategoryCard = (categoryTitle, items) => (
    <div className="fundraiser-card">
      <center><h3 className="card-title">{categoryTitle}</h3></center>
      <div className="category-items">
        <hr className="divider" />
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
  <div>
    {posts.map((post, idx) => (
      <div key={idx} className="fundraiser-card">
        
        <h2 className="card-title">{post.title}</h2>
        <div className="card-images">
          {post.images.map((img, i) => (
            <img key={i} src={img} alt={`${post.title} image ${i+1}`} className="card-image" />
          ))}
        </div>
        <p className="card-description">{post.description}</p>
        <p className="card-date">Date: {post.date}</p>
        <center><button className="card-button">Contribute Now</button></center>
      </div>
    ))}
  </div>
</section>


    </div>
  );
}