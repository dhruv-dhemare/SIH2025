import React, { useState } from 'react';
import PostCard from '../components/PostCard.jsx';
import Filters from '../components/Filters.jsx';
import '../App.css';

// ✅ Updated events array with category and date
const events = [
  {
    id: 1,
    userName: "Campus Coding Club",
    userRole: "Hackathon • 2h ago",
    avatar: "https://i.pravatar.cc/40?img=12",
    content: "We’re thrilled to announce our annual 24-hour Hackathon! Form your teams and showcase your coding skills.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1080&auto=format&fit=crop",
    category: "hackathon",
    date: new Date("2025-09-07T14:00:00")
  },
  {
    id: 2,
    userName: "Art & Culture Society",
    userRole: "Exhibition • 5h ago",
    avatar: "https://i.pravatar.cc/40?img=25",
    content: "🎨 Join us this weekend for an open art exhibition featuring students’ best paintings and crafts.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1080&auto=format&fit=crop",
    category: "exhibition",
    date: new Date("2025-09-08T10:00:00")
  },
  {
    id: 3,
    userName: "Music Club",
    userRole: "Concert • 1d ago",
    avatar: "https://i.pravatar.cc/40?img=18",
    content: "Get ready for an electrifying evening with live bands, solo performances, and an open mic session.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1080&auto=format&fit=crop",
    category: "concert",
    date: new Date("2025-09-06T19:00:00")
  },
  {
    id: 4,
    userName: "Sports Committee",
    userRole: "Tournament • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=30",
    content: "⚽ Register now for the inter-college football tournament. Prizes and trophies await the winners!",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1080&auto=format&fit=crop",
    category: "tournament",
    date: new Date("2025-09-10T09:00:00")
  }
];

function Events() {
  const [filter, setFilter] = useState({
    category: "all",
    timeframe: "anytime"
  });

  // ✅ Dynamic filter options for Events
  const filterOptions = {
    category: [
      { label: "All", value: "all" },
      { label: "Hackathon", value: "hackathon" },
      { label: "Exhibition", value: "exhibition" },
      { label: "Concert", value: "concert" },
      { label: "Tournament", value: "tournament" },
      { label: "Charity", value: "charity" },
    ],
    timeframe: [
      { label: "Anytime", value: "anytime" },
      { label: "Last 24 hours", value: "24h" },
      { label: "Last 7 days", value: "7d" },
      { label: "Next 7 days", value: "next7d" },
      { label: "Upcoming", value: "upcoming" },
    ]
  };

  // Apply filters
  let filteredEvents = [...events];

  // Category filter
  if (filter.category !== "all") {
    filteredEvents = filteredEvents.filter(event => event.category === filter.category);
  }

  // Timeframe filter
  if (filter.timeframe !== "anytime") {
    const now = new Date();
    if (filter.timeframe === "24h") {
      const cutoff = new Date(now - 24 * 60 * 60 * 1000);
      filteredEvents = filteredEvents.filter(event => event.date >= cutoff);
    } else if (filter.timeframe === "7d") {
      const cutoff = new Date(now - 7 * 24 * 60 * 60 * 1000);
      filteredEvents = filteredEvents.filter(event => event.date >= cutoff);
    } else if (filter.timeframe === "next7d") {
      const cutoff = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      filteredEvents = filteredEvents.filter(event => event.date <= cutoff && event.date >= now);
    } else if (filter.timeframe === "upcoming") {
      filteredEvents = filteredEvents.filter(event => event.date >= now);
    }
  }

  return (
    <div className="home-content">
      {/* Event filters with Add Post button */}
      <Filters 
        filter={filter} 
        setFilter={setFilter} 
        filterOptions={filterOptions} 
        showEventPost={true}  // ✅ enable Add Post button
      />

      <div className="events-container">
        {filteredEvents.map(event => (
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
    </div>
  );
}

export default Events;
