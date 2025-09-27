import React, { useState } from 'react';
import PostCard from '../components/PostCard.jsx';
import Filters from '../components/Filters.jsx';
import { useNavigate } from "react-router-dom";

import '../App.css';
import { Search } from "lucide-react";  // ✅ Import the icon
// ✅ Updated events array with category and date
const events = [
  {
    id: 1,
    userName: "Campus Coding Club",
    userRole: "Hackathon • 2h ago",
    avatar: "https://i.pravatar.cc/40?img=12",
    content: "We’re thrilled to announce our annual 24-hour Hackathon! This is your chance to collaborate with like-minded peers, solve real-world challenges, and build innovative projects from scratch. Whether you’re a beginner or a pro, there’s a place for everyone. Form your dream team and showcase your coding skills to win exciting prizes.",
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/code-hackathon-event-poster-design-template-d7c8ddfd12e11fd2b9c6b70241626091_screen.jpg?ts=1567076214",
    category: "hackathon",
    date: new Date("2025-09-07T14:00:00")
  },
  {
    id: 2,
    userName: "Art Circle",
    userRole: "Exhibition • 5h ago",
    avatar: "https://i.pravatar.cc/40?img=25",
    content: "🎨 Step into a world of colors and creativity at our open art exhibition! Featuring stunning paintings, crafts, and installations by students across all departments, this event promises to be a visual delight. Explore different themes, meet the artists behind the work, and get inspired by their creativity. Don’t miss this chance to witness raw talent on display.",
    image: "https://s3.amazonaws.com/thumbnails.venngage.com/template/c11f2804-b5ee-4c57-a938-c460e3282bdd.png",
    category: "exhibition",
    date: new Date("2025-09-08T10:00:00")
  },
  {
    id: 3,
    userName: "Addiction Committee",
    userRole: "Concert • 1d ago",
    avatar: "https://i.pravatar.cc/40?img=18",
    content: "Get ready for an electrifying evening of music and celebration! Our annual concert will feature live bands, soulful solo acts, and an open mic session for budding singers. Experience a mix of genres from rock to classical, performed by some of the most talented students. Bring your friends, sing along, and let the music take over your night.",
    image: "https://c8.alamy.com/comp/RYE65H/vector-illustration-rock-festival-concert-party-flyer-or-poster-design-template-with-guitar-place-for-text-and-cool-effects-in-the-background-RYE65H.jpg",
    category: "concert",
    date: new Date("2025-09-06T19:00:00")
  },
  {
    id: 4,
    userName: "Sports Committee",
    userRole: "Tournament • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=30",
    content: "⚽ Calling all football enthusiasts! The inter-college football tournament is back, bigger and better than ever. Teams from across the region will battle it out on the field for the championship title. Cheer for your favorite team, enjoy thrilling matches, and witness high-energy performances. Trophies, medals, and bragging rights are at stake!",
    image: "https://img.freepik.com/premium-vector/sports-day-vector-illustration-sports-event-graphic-design-banner-poster-flyer-design_7888-976.jpg",
    category: "tournament",
    date: new Date("2025-09-10T09:00:00")
  },
  {
    id: 5,
    userName: "ACM Student Chapter",
    userRole: "Hackathon • 1w ago",
    avatar: "https://i.pravatar.cc/40?img=32",
    content: "🚀 Brace yourself for the AI Innovation Hackathon! In this challenge, teams will solve pressing problems using artificial intelligence and machine learning tools. From healthcare to sustainability, your ideas can make a real impact. Network with mentors, learn new skills, and test your creativity in an intense coding marathon. Exciting rewards await the winners.",
    image: "https://www.knowafest.com/files/uploads/%E2%80%9C24%20hrs%20hackathon%E2%80%9D-2024101507.png",
    category: "hackathon",
    date: new Date("2025-09-01T09:00:00")
  },
  {
    id: 6,
    userName: "Pictoreals Club",
    userRole: "Exhibition • 3d ago",
    avatar: "https://i.pravatar.cc/40?img=45",
    content: "📸 Join us for a breathtaking showcase of street photography! Our photographers have captured the essence of everyday life through unique perspectives and raw emotions. From busy marketplaces to quiet alleys, every frame tells a story. Come, explore the world through their lenses, and discover the hidden beauty around us.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1080&auto=format&fit=crop",
    category: "exhibition",
    date: new Date("2025-09-05T11:30:00")
  },
  {
    id: 7,
  userName: "NSS Unit",
    userRole: "Charity • 4h ago",
    avatar: "https://i.pravatar.cc/40?img=11",
    content: "💝 We invite you to be part of our Blood Donation Drive, organized in collaboration with City Hospital. A single donation can save multiple lives, and your contribution will truly make a difference. Doctors and volunteers will be present to ensure a safe and smooth process. Step up, donate, and become someone’s hero today.",
    image: "https://gleneagles.com.my/images/gleneagleshospitalkualalumpurlibraries/events/blood-donation-drive-september-thumbnail-(1)-(1).webp?sfvrsn=48e0fee7_1",
    category: "charity",
    date: new Date("2025-09-09T10:00:00")
  },
  {
    id: 8,
    userName: "Deb-soc Club",
    userRole: "Exhibition • 1w ago",
    avatar: "https://i.pravatar.cc/40?img=39",
    content: "📚 Discover the magic of words at our Rare Book & Poetry Exhibition! Featuring a collection of old manuscripts, modern literature, and original poetry by students, this exhibition is a paradise for book lovers. Attend live poetry readings, interact with writers, and immerse yourself in the timeless power of storytelling.",
    image: "https://d2z11snniwyi52.cloudfront.net/images/template/10369/44/poetry-quill-invitation__front.jpg",
    category: "exhibition",
    date: new Date("2025-08-31T16:00:00")
  },
  {
    id: 9,
    userName: "ART circle",
    userRole: "Concert • 3h ago",
    avatar: "https://i.pravatar.cc/40?img=27",
    content: "💃 Get ready to move to the beat at our Annual Dance Night! From energetic hip-hop performances to graceful classical pieces, this event has something for everyone. Talented dancers will light up the stage with mesmerizing choreography and captivating energy. Join us for a night of rhythm, passion, and pure entertainment.",
    image: "https://i.pinimg.com/originals/77/d1/18/77d1185ff2eb4fa240161e54ee3c7080.jpg",
    category: "concert",
    date: new Date("2025-09-11T18:30:00")
  },
  {
    id: 10,
    userName: "Sports Committee",
    userRole: "Tournament • 5h ago",
    avatar: "https://i.pravatar.cc/40?img=14",
    content: "🏸 Sharpen your skills and join our Badminton Doubles Tournament! Whether you’re playing for fun or aiming for the trophy, this event promises an action-packed day filled with energy and competition. Register with your partner, bring your A-game, and enjoy a sporting experience that will test both your skill and teamwork.",
    image: "https://static.vecteezy.com/system/resources/previews/036/770/111/non_2x/badminton-championship-poster-for-sport-event-free-vector.jpg",
    category: "tournament",
    date: new Date("2025-09-12T09:00:00")
  },
  {
    id: 11,
    userName: "Green Earth Society",
    userRole: "Charity • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=21",
    content: "🌱 Join us in our Tree Plantation Drive near the campus lake! Together, we can create a greener tomorrow by planting saplings and caring for the environment. This event also includes a short workshop on sustainability and eco-friendly living. Bring your friends and help us make our surroundings cleaner and healthier.",
    image: "https://zhl.org.in/blog/wp-content/uploads/2023/07/TREE-PLANTATION-IS-IMPORTANT.jpg",
    category: "charity",
    date: new Date("2025-09-04T08:00:00")
  },
  {
    id: 12,
    userName: "IEEE Student Branch",
    userRole: "Hackathon • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=35",
    content: "👨‍💻 Step into the world of game development with our Mini Game Dev Hackathon! Teams will compete to build fun and engaging browser-based games within just 12 hours. Learn new frameworks, push your creativity, and present your game to an expert panel. It’s fast-paced, challenging, and incredibly rewarding.",
    image: "https://tse1.mm.bing.net/th/id/OIP.uIv1ewPv28bXSY597hbr2gHaB2?pid=Api&P=0&h=180",
    category: "hackathon",
    date: new Date("2025-09-03T09:00:00")
  },
  {
    id: 13,
    userName: "Pictoreal Club",
    userRole: "Charity • 1w ago",
    avatar: "https://i.pravatar.cc/40?img=17",
    content: "🍲 Help make a difference by joining our Food Donation Drive. Together, we will prepare and distribute meals to underprivileged communities in the city. Volunteers are welcome to help with cooking, packaging, and distribution. Every small contribution counts toward creating a kinder, more caring society.",
    image: "https://tse2.mm.bing.net/th/id/OIP.J6mTq4HnEnzVwsJUf7Z0HwHaFj?pid=Api&P=0&h=180",
    category: "charity",
    date: new Date("2025-08-30T12:00:00")
  },
  {
    id: 14,
    userName: "Music Club",
    userRole: "Concert • 4d ago",
    avatar: "https://i.pravatar.cc/40?img=19",
    content: "🎶 Join us for a soulful Jazz Night on campus! Talented musicians will perform live, bringing you classics as well as original compositions. Sit back, relax, and let the smooth tunes create an atmosphere of calm and joy. Perfect for music lovers who want to enjoy an intimate and memorable evening.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1080&auto=format&fit=crop",
    category: "concert",
    date: new Date("2025-09-02T19:00:00")
  },
  {
    id: 15,
    userName: "Athletics Department",
    userRole: "Tournament • 6h ago",
    avatar: "https://i.pravatar.cc/40?img=41",
    content: "🏃 The Track & Field Championship is here! Athletes from different colleges will compete in sprints, relays, high jumps, and more. It’s a day of passion, perseverance, and sporting spirit. Bring your energy, cheer for your athletes, and celebrate the true essence of competitive sportsmanship.",
    image: "http://blog.bibrik.com/wp-content/uploads/2017/08/IMG_8576.jpg",
    category: "tournament",
    date: new Date("2025-09-13T08:30:00")
  }
];


function Events() {
  const [filter, setFilter] = useState({
    category: "all",
    timeframe: "anytime"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


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
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/searched?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home-content">
      {/* Event filters with Add Post button */}
      <Filters 
        filter={filter} 
        setFilter={setFilter} 
        filterOptions={filterOptions} 
        showEventPost={false}  // ✅ enable Add Post button
      />

<form className="search-bar" onSubmit={handleSearch}>
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button type="submit" className="search-btn">
    <Search size={20} strokeWidth={2.5} />  {/* ✅ Lucide Search Icon */}
  </button>
</form>



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
