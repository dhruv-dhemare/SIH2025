import React from 'react';
import PostCard from '../components/PostCard.jsx';
import '../App.css';

const events = [
  {
    id: 1,
    userName: "Campus Coding Club",
    userRole: "Hackathon • 2h ago",
    avatar: "https://i.pravatar.cc/40?img=12",
    content: "We’re thrilled to announce our annual 24-hour Hackathon! Form your teams and showcase your coding skills.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1080&auto=format&fit=crop"
  },
  {
    id: 2,
    userName: "Art & Culture Society",
    userRole: "Exhibition • 5h ago",
    avatar: "https://i.pravatar.cc/40?img=25",
    content: "🎨 Join us this weekend for an open art exhibition featuring students’ best paintings and crafts.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1080&auto=format&fit=crop"
  },
  {
    id: 3,
    userName: "Music Club",
    userRole: "Concert • 1d ago",
    avatar: "https://i.pravatar.cc/40?img=18",
    content: "Get ready for an electrifying evening with live bands, solo performances, and an open mic session.",
    image: "https://images.unsplash.com/photo-1486591038957-19e7c73bdc81?q=80&w=1080&auto=format&fit=crop"
  },
  {
    id: 4,
    userName: "Sports Committee",
    userRole: "Tournament • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=30",
    content: "⚽ Register now for the inter-college football tournament. Prizes and trophies await the winners!",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1080&auto=format&fit=crop"
  }
];


function Events() {
  return (
    <div className="home-content">
      <div className="events-container">
        {events.map(event => (
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