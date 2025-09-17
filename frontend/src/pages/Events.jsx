import React, { useState } from 'react';
import PostCard from '../components/PostCard.jsx';
import Filters from '../components/Filters.jsx';
import '../App.css';

const events = [
  {
    id: 1,
    userName: "Campus Coding Club",
    userRole: "Hackathon • 2h ago",
    avatar: "https://i.pravatar.cc/40?img=12",
    content: "🚀 Join our annual 24-hour Hackathon! Form teams and showcase your coding skills. Top projects will get mentorship and prizes.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1080&auto=format&fit=crop",
    category: "hackathon",
    date: new Date("2025-09-07T14:00:00")
  },
  {
    id: 2,
    userName: "Alumni Entrepreneurship Cell",
    userRole: "Startup Workshop • 5h ago",
    avatar: "https://i.pravatar.cc/40?img=25",
    content: "💡 Workshop on pitching to investors and startup fundraising. Open for students and alumni founders. Limited seats, register soon!",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1080&auto=format&fit=crop",
    category: "workshop",
    date: new Date("2025-09-08T11:00:00")
  },
  {
    id: 3,
    userName: "Music & Cultural Society",
    userRole: "Concert • 1d ago",
    avatar: "https://i.pravatar.cc/40?img=18",
    content: "🎵 Live music evening with performances by alumni bands and students. Networking and dinner included.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1080&auto=format&fit=crop",
    category: "concert",
    date: new Date("2025-09-06T19:00:00")
  },
  {
    id: 4,
    userName: "Sports Committee",
    userRole: "Inter-college Tournament • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=30",
    content: "⚽ Register for the inter-college football tournament. Alumni teams encouraged to participate. Prizes and trophies for winners!",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1080&auto=format&fit=crop",
    category: "tournament",
    date: new Date("2025-09-10T09:00:00")
  },
  // {
  //   id: 5,
  //   userName: "AI & ML Alumni Circle",
  //   userRole: "Webinar • 3d ago",
  //   avatar: "https://i.pravatar.cc/40?img=33",
  //   content: "🤖 Webinar on Generative AI trends and applications. Learn from industry-leading alumni at top tech companies.",
  //   image: "https://www.freepik.com/free-photo/ai-technology-microchip-background-futuristic-innovation-technology-remix_13097899.htm",
  //   category: "webinar",
  //   date: new Date("2025-09-12T17:00:00")
  // },
  {
    id: 6,
    userName: "Finance & Investment Club",
    userRole: "Guest Lecture • 4d ago",
    avatar: "https://i.pravatar.cc/40?img=15",
    content: "💼 Expert alumni will discuss current market trends, portfolio management, and career opportunities in finance. Q&A session included.",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1080&auto=format&fit=crop", // Finance
    category: "lecture",
    date: new Date("2025-09-13T15:00:00")
  },
  {
    id: 7,
    userName: "Global Alumni Meetup",
    userRole: "Networking • 5d ago",
    avatar: "https://i.pravatar.cc/40?img=28",
    content: "🌐 Virtual meetup for international alumni to connect, share experiences, and explore collaborations.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1080&auto=format&fit=crop",
    category: "networking",
    date: new Date("2025-09-14T18:00:00")
  },
  {
    id: 8,
    userName: "Women in Tech Forum",
    userRole: "Panel Discussion • 6d ago",
    avatar: "https://i.pravatar.cc/40?img=20",
    content: "👩‍💻 Panel with successful female alumni in tech sharing insights, mentorship opportunities, and challenges in the industry.",
    image: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?q=80&w=1080&auto=format&fit=crop",
    category: "panel",
    date: new Date("2025-09-15T16:00:00")
  },
  {
    id: 9,
    userName: "Cultural Fest Committee",
    userRole: "Cultural Festival • 1w ago",
    avatar: "https://i.pravatar.cc/40?img=24",
    content: "🎭 Annual cultural fest with alumni performances, competitions, and food stalls. A celebration of talent and creativity!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1080&auto=format&fit=crop",
    category: "festival",
    date: new Date("2025-09-09T10:00:00")
  },
  {
    id: 10,
    userName: "Social Impact Club",
    userRole: "Charity Drive • 1w ago",
    avatar: "https://i.pravatar.cc/40?img=16",
    content: "🤝 Alumni-led charity drive supporting local schools. Volunteers welcome. Let’s give back to the community together!",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1080&auto=format&fit=crop",
    category: "charity",
    date: new Date("2025-09-11T09:00:00")
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
