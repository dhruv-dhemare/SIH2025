import React, { useState } from "react";
import PostCard from "../components/PostCard.jsx";
import Filters from "../components/Filters.jsx";
import "../App.css";

const posts = [
  {
    id: 1,
    userName: "Jane Doe",
    userRole: "Frontend Developer • 3h ago",
    avatar: "https://i.pravatar.cc/40?img=1",
    content:
      "Excited to share my new project on CSS animations! Check it out and let me know what you think.",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.x0EvzB8FPfsYABXZBOesNAHaE7?pid=Api&P=0&h=180",
    category: "tech",
    likes: 12,
    comments: 4,
    date: new Date("2025-09-06T10:00:00"),
  },
  {
    id: 2,
    userName: "John Smith",
    userRole: "UI/UX Designer • 1d ago",
    avatar: "https://i.pravatar.cc/40?img=2",
    content:
      "A deep dive into the psychology of color in user interface design. Read more on my blog!",
    image:
      "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    category: "design",
    likes: 25,
    comments: 12,
    date: new Date("2025-09-05T08:00:00"),
  },
  {
    id: 3,
    userName: "Samantha Lee",
    userRole: "Data Scientist • 5h ago",
    avatar: "https://i.pravatar.cc/40?img=3",
    content:
      "Exploring the new features of Python's pandas library. Data cleaning just got a lot easier!",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.AzEgci9oxeTXlcgU5ia3DAHaE7?pid=Api&P=0&h=180",
    category: "education",
    likes: 8,
    comments: 2,
    date: new Date("2025-09-07T09:00:00"),
  },
  {
    id: 4,
    userName: "Michael Chen",
    userRole: "Cloud Engineer • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=4",
    content:
      "My thoughts on serverless architecture and its impact on cost efficiency for startups.",
    image: "https://www.collegenp.com/uploads/2023/01/Group-Study.jpg",
    category: "business",
    likes: 30,
    comments: 15,
    date: new Date("2025-09-04T12:00:00"),
  },
];

function Home() {
  const [filter, setFilter] = useState({
    sortBy: "recent",
    category: "all",
    timeframe: "anytime",
    connections: "all",
  });

  // ✅ Dynamic filter options
  const filterOptions = {
    sortBy: [
      { label: "Most Recent", value: "recent" },
      { label: "Most Popular", value: "popular" },
      { label: "Most Liked", value: "liked" },
      { label: "Most Commented", value: "commented" },
    ],
    category: [
      { label: "All", value: "all" },
      { label: "Technology", value: "tech" },
      { label: "Education", value: "education" },
      { label: "Business", value: "business" },
      { label: "Design", value: "design" },
      { label: "Finance", value: "finance" },
    ],
    timeframe: [
      { label: "Anytime", value: "anytime" },
      { label: "Last 24 hours", value: "24h" },
      { label: "Last 7 days", value: "7d" },
      { label: "Last 30 days", value: "30d" },
    ],
    connections: [
      { label: "All Connections", value: "all" },
      { label: "1st Degree", value: "1st" },
      { label: "2nd Degree", value: "2nd" },
      { label: "3rd Degree", value: "3rd" },
    ],
  };

  // Apply filters
  let filteredPosts = [...posts];

  if (filter.category !== "all") {
    filteredPosts = filteredPosts.filter(
      (post) => post.category === filter.category
    );
  }

  if (filter.timeframe !== "anytime") {
    const now = new Date();
    let cutoff;
    if (filter.timeframe === "24h") cutoff = new Date(now - 24 * 60 * 60 * 1000);
    else if (filter.timeframe === "7d") cutoff = new Date(now - 7 * 24 * 60 * 60 * 1000);
    else if (filter.timeframe === "30d") cutoff = new Date(now - 30 * 24 * 60 * 60 * 1000);

    filteredPosts = filteredPosts.filter((post) => post.date >= cutoff);
  }

  if (filter.sortBy === "popular") filteredPosts.sort((a, b) => b.comments - a.comments);
  else if (filter.sortBy === "liked") filteredPosts.sort((a, b) => b.likes - a.likes);
  else if (filter.sortBy === "commented") filteredPosts.sort((a, b) => b.comments - a.comments);
  else filteredPosts.sort((a, b) => b.date - a.date);

  return (
    <div className="home-content">
      {/* ✅ Dynamic filters */}
      <Filters filter={filter} setFilter={setFilter} filterOptions={filterOptions} showAddPost={true}  />

      <div className="posts-container">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            userName={post.userName}
            userRole={post.userRole}
            avatar={post.avatar}
            content={post.content}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
