// // src/pages/Messages.jsx
// import React, { useState } from "react";
// import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
// import SearchBar from "../components/SearchBar/SearchBar";
// import ChatList from "../components/ChatList/ChatList";
// import ForumList from "../components/ForumList/ForumList";
// import "./Messages.css";

// export default function Messages() {
//   const [chatQuery, setChatQuery] = useState("");
//   const [forumQuery, setForumQuery] = useState("");

//   const chats = [
//     { id: 1, name: "John Doe", lastMessage: "Hey, how are you?", time: "12:30 PM", unread: true, unreadCount: 2 },
//     { id: 2, name: "Jane Smith", lastMessage: "Let's meet tomorrow.", time: "11:15 AM", unread: false, unreadCount: 0 },
//   ];

//   const forums = [
//     { id: 1, name: "AI/ML Enthusiasts", members: 1200, category: "Tech", lastActivity: "1h ago", tag: "AI", badge: "Hot" },
//     { id: 2, name: "Entrepreneurs Hub", members: 850, category: "Business", lastActivity: "3h ago", tag: "Startup", badge: "Trending" },
//   ];

//   return (
//     <div className="messages-container">
//       <LeftSidebar />

//       <main className="messages-main">
//         {/* Chats Section */}
//         <section className="messages-section">
//           <h2>Chats</h2>
//           <SearchBar value={chatQuery} onChange={setChatQuery} placeholder="Search chats..." />
//           <ChatList items={chats} query={chatQuery} />
//         </section>

//         {/* Forums Section */}
//         <section className="messages-section">
//           <h2>Communities</h2>
//           <SearchBar value={forumQuery} onChange={setForumQuery} placeholder="Search communities..." />
//           <ForumList items={forums} query={forumQuery} />
//         </section>
//       </main>
//     </div>
//   );
// }

import React, { useState } from "react";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import SearchBar from "../components/SearchBar/SearchBar";
import ChatList from "../components/ChatList/ChatList";
import ForumList from "../components/ForumList/ForumList";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import ForumWindow from "../components/ForumWindow/ForumWindow";
import "./Messages.css";

export default function Messages() {
  // Local state
  const [chatQuery, setChatQuery] = useState("");
  const [forumQuery, setForumQuery] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [activeForum, setActiveForum] = useState(null);

  // Dummy data
  const chats = [
    { id: 1, name: "Alice", lastMessage: "See you tomorrow!", time: "10:00 AM", unread: true, unreadCount: 2 },
    { id: 2, name: "Bob", lastMessage: "Thanks for the update", time: "09:15 AM", unread: false, unreadCount: 0 },
    { id: 3, name: "Charlie", lastMessage: "How’s the project?", time: "Yesterday", unread: false, unreadCount: 0 }
  ];

  const forums = [
    { id: 1, name: "AI Enthusiasts", members: 120, category: "Technology", lastActivity: "2m ago", tag: "AI/ML", badge: "Hot" },
    { id: 2, name: "Startup Founders", members: 85, category: "Business", lastActivity: "1h ago", tag: "Entrepreneurship" },
    { id: 3, name: "Data Science Hub", members: 200, category: "Analytics", lastActivity: "Yesterday", tag: "Data" }
  ];

  return (
    <div className="messages-container">
      {/* Sidebar */}
      <LeftSidebar />

      {/* Main content */}
      <div className="messages-main">
        
        {/* Chats Section */}
        <div className="panel">
          <div className="panel-header">
            {activeChat ? (
              <h3>Chat</h3>
            ) : (
              <>
                <h3>Chats</h3>
                <SearchBar
                  value={chatQuery}
                  onChange={setChatQuery}
                  placeholder="Search chats..."
                />
              </>
            )}
          </div>

          <div className="panel-body">
            {activeChat ? (
              <ChatWindow chat={activeChat} onBack={() => setActiveChat(null)} />
            ) : (
              <ChatList items={chats} query={chatQuery} onSelect={setActiveChat} />
            )}
          </div>
        </div>

        {/* Forums Section */}
        <div className="panel">
          <div className="panel-header">
            {activeForum ? (
              <h3>Community</h3>
            ) : (
              <>
                <h3>Communities</h3>
                <SearchBar
                  value={forumQuery}
                  onChange={setForumQuery}
                  placeholder="Search communities..."
                />
              </>
            )}
          </div>

          <div className="panel-body">
            {activeForum ? (
              <ForumWindow forum={activeForum} onBack={() => setActiveForum(null)} />
            ) : (
              <ForumList items={forums} query={forumQuery} onOpen={setActiveForum} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
