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

  // Toggle state for Chats/Community
  const [activeTab, setActiveTab] = useState("chats");

  // Dummy data
  const chats = [
    { id: 1, name: "Alice", lastMessage: "See you tomorrow!", time: "10:00 AM", unread: true, unreadCount: 2 },
    { id: 2, name: "Bob", lastMessage: "Thanks for the update", time: "09:15 AM", unread: false, unreadCount: 0 },
    { id: 3, name: "Charlie", lastMessage: "How's the project?", time: "Yesterday", unread: false, unreadCount: 0 }
  ];

  const forums = [
    { id: 1, name: "AI Enthusiasts", members: 120, category: "Technology", lastActivity: "2m ago", tag: "AI/ML", badge: "Hot" },
    { id: 2, name: "Startup Founders", members: 85, category: "Business", lastActivity: "1h ago", tag: "Entrepreneurship" },
    { id: 3, name: "Data Science Hub", members: 200, category: "Analytics", lastActivity: "Yesterday", tag: "Data" }
  ];

  return (
    <div className="messages-container">
      {/* Main content */}
      <div className="messages-main">
        
        {/* Tab Switcher */}
        <div className="tab-header">
          <button
            className={activeTab === "chats" ? "active-tab" : ""}
            onClick={() => setActiveTab("chats")}
          >
            Chats
          </button>
          <button
            className={activeTab === "community" ? "active-tab" : ""}
            onClick={() => setActiveTab("community")}
          >
            Community
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-body">
          {activeTab === "chats" ? (
            activeChat ? (
              <ChatWindow chat={activeChat} onBack={() => setActiveChat(null)} />
            ) : (
              <>
                <SearchBar
                  value={chatQuery}
                  onChange={setChatQuery}
                  placeholder="Search chats..."
                />
                <ChatList items={chats} query={chatQuery} onSelect={setActiveChat} />
              </>
            )
          ) : (
            activeForum ? (
              <ForumWindow forum={activeForum} onBack={() => setActiveForum(null)} />
            ) : (
              <>
                <SearchBar
                  value={forumQuery}
                  onChange={setForumQuery}
                  placeholder="Search communities..."
                />
                <ForumList items={forums} query={forumQuery} onOpen={setActiveForum} />
              </>
            )
          )}
        </div>
      </div>

      {/* Right Filter Section */}
      <div className="messages-filter">
        {/* Empty placeholder for now */}
      </div>
    </div>
  );
}
