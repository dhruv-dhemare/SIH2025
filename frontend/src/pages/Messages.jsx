
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ChatList from "../components/ChatList";
import ForumList from "../components/ForumList";
import ChatWindow from "../components/ChatWindow";
import ForumWindow from "../components/ForumWindow";
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
    { id: 3, name: "Charlie", lastMessage: "How's the project?", time: "Yesterday", unread: false, unreadCount: 0 },
    { id: 4, name: "Alice", lastMessage: "See you tomorrow!", time: "10:00 AM", unread: true, unreadCount: 2 },
    { id: 5, name: "Bob", lastMessage: "Thanks for the update", time: "09:15 AM", unread: false, unreadCount: 0 },
    { id: 6, name: "Charlie", lastMessage: "How's the project?", time: "Yesterday", unread: false, unreadCount: 0 },
    { id: 7, name: "Alice", lastMessage: "See you tomorrow!", time: "10:00 AM", unread: true, unreadCount: 2 },
    { id: 8, name: "Bob", lastMessage: "Thanks for the update", time: "09:15 AM", unread: false, unreadCount: 0 },
    { id: 9, name: "Charlie", lastMessage: "How's the project?", time: "Yesterday", unread: false, unreadCount: 0 }
  ];

  const forums = [
    { id: 1, name: "AI Enthusiasts", members: 120, category: "Technology", lastActivity: "2m ago", tag: "AI/ML", badge: "Hot" },
    { id: 2, name: "Startup Founders", members: 85, category: "Business", lastActivity: "1h ago", tag: "Entrepreneurship" },
    { id: 3, name: "Data Science Hub", members: 200, category: "Analytics", lastActivity: "Yesterday", tag: "Data" },
    { id: 4, name: "AI Enthusiasts", members: 120, category: "Technology", lastActivity: "2m ago", tag: "AI/ML", badge: "Hot" },
    { id: 5, name: "Startup Founders", members: 85, category: "Business", lastActivity: "1h ago", tag: "Entrepreneurship" },
    { id: 6, name: "Data Science Hub", members: 200, category: "Analytics", lastActivity: "Yesterday", tag: "Data" }
  ];

  return (
    <div className="messages-container">
      

      {/* Main content */}
      <div className="messages-main">
        
        {/* Chats Section */}
        <div className="panel">
          <div className="panel-header">
            {activeChat ? (
              <h3 style={{ color: "teal", margin: "20px" }}>Chats</h3>
            ) : (
              <>
                <h3 style={{ color: "teal", margin: "20px" }}>Chats</h3>
                <center>
                  <SearchBar
                  value={chatQuery}
                  onChange={setChatQuery}
                  placeholder="Search chats..."
                />
                </center>
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
              <h3 style={{ color: "teal", margin: "20px" }}>Community</h3>
            ) : (
              <>
                <h3 style={{ color: "teal", margin: "20px" }}>Community</h3>
                <center>
                  <SearchBar
                  value={forumQuery}
                  onChange={setForumQuery}
                  placeholder="Search communities..."
                />
                </center>
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