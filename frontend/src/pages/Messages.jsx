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
    {
      id: 1,
      name: "Dr. Ramesh Kumar",
      role: "Professor - CSE Dept.",
      lastMessage: "Great, I’ll check it tonight.",
      time: "10:20 AM",
      unread: true,
      unreadCount: 2,
      messages: [
        {
          id: 1,
          sender: "Dr. Ramesh Kumar",
          text: "Don’t forget to submit your abstracts by next week.",
          time: "10:20 AM",
          mine: false,
        },
        {
          id: 2,
          sender: "You",
          text: "Thanks for the reminder, sir!",
          time: "10:22 AM",
          mine: true,
        },
        {
          id: 3,
          sender: "You",
          text: "I’ve already drafted mine, will send it for review today.",
          time: "10:30 AM",
          mine: true,
        },
        {
          id: 4,
          sender: "Dr. Ramesh Kumar",
          text: "Great, I’ll check it tonight.",
          time: "10:35 AM",
          mine: false,
        },
      ],
    },
    {
      id: 2,
      name: "Neha Sharma",
      role: "Alumni, Google (SWE '20)",
      lastMessage: "Looking forward to it!",
      time: "Yesterday",
      unread: false,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: "Neha Sharma",
          text: "Happy to review your resume draft, send it over!",
          time: "Yesterday",
          mine: false,
        },
        {
          id: 2,
          sender: "You",
          text: "I’ll send it by tonight, thank you!",
          time: "Yesterday",
          mine: true,
        },
        {
          id: 3,
          sender: "Neha Sharma",
          text: "Looking forward to it!",
          time: "Yesterday",
          mine: false,
        },
      ],
    },
    {
      id: 3,
      name: "Rahul Verma",
      role: "Final Year Student",
      lastMessage: "That really helped me, thanks bhaiya!",
      time: "Mon",
      unread: false,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: "Rahul Verma",
          text: "Thanks for the referral guidance!",
          time: "Mon",
          mine: false,
        },
        {
          id: 2,
          sender: "You",
          text: "Anytime, Rahul 👍",
          time: "Mon",
          mine: true,
        },
        {
          id: 3,
          sender: "Rahul Verma",
          text: "That really helped me, thanks bhaiya!",
          time: "Mon",
          mine: false,
        },
      ],
    },
    {
      id: 4,
      name: "Anjali Gupta",
      role: "Alumni, Amazon (Data Scientist '19)",
      lastMessage: "Sure, I’ll share the link.",
      time: "Sep 12",
      unread: true,
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: "Anjali Gupta",
          text: "We are opening DS internships this fall. Apply soon!",
          time: "Sep 12",
          mine: false,
        },
        {
          id: 2,
          sender: "You",
          text: "That’s amazing, will share with juniors!",
          time: "Sep 12",
          mine: true,
        },
        {
          id: 3,
          sender: "You",
          text: "Can you also share the official application link?",
          time: "Sep 12",
          mine: true,
        },
        {
          id: 4,
          sender: "Anjali Gupta",
          text: "Sure, I’ll share the link.",
          time: "Sep 12",
          mine: false,
        },
      ],
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Alumni, Microsoft (PM '18)",
      lastMessage: "Catch you tomorrow at the AMA.",
      time: "Sep 10",
      unread: false,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: "Vikram Singh",
          text: "Join our product design AMA tomorrow evening!",
          time: "Sep 10",
          mine: false,
        },
        {
          id: 2,
          sender: "You",
          text: "Sounds great! What time?",
          time: "Sep 10",
          mine: true,
        },
        {
          id: 3,
          sender: "Vikram Singh",
          text: "7 PM IST. Catch you tomorrow at the AMA.",
          time: "Sep 10",
          mine: false,
        },
      ],
    },
    {
      id: 6,
      name: "Priya Nair",
      role: "Alumni, Stanford (MBA '21)",
      lastMessage: "Let’s brainstorm next week.",
      time: "Sep 8",
      unread: true,
      unreadCount: 4,
      messages: [
        {
          id: 1,
          sender: "Priya Nair",
          text: "I’m planning to launch a startup in EdTech.",
          time: "Sep 8",
          mine: false,
        },
        {
          id: 2,
          sender: "You",
          text: "That’s exciting! What’s the idea about?",
          time: "Sep 8",
          mine: true,
        },
        {
          id: 3,
          sender: "Priya Nair",
          text: "An AI-driven platform for personalized learning paths.",
          time: "Sep 8",
          mine: false,
        },
        {
          id: 4,
          sender: "You",
          text: "Let’s brainstorm next week.",
          time: "Sep 8",
          mine: true,
        },
      ],
    },
    {
      id: 7,
      name: "Karan Patel",
      role: "Alumni, Meta (AR/VR Engineer '17)",
      lastMessage: "Yes, I can guide you with ARKit.",
      time: "Sep 5",
      unread: false,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: "You",
          text: "Do you have any AR resources to recommend?",
          time: "Sep 5",
          mine: true,
        },
        {
          id: 2,
          sender: "Karan Patel",
          text: "Yes, I can guide you with ARKit.",
          time: "Sep 5",
          mine: false,
        },
      ],
    },
    {
      id: 8,
      name: "Sneha Iyer",
      role: "Final Year Student",
      lastMessage: "Please check my resume draft.",
      time: "Sep 3",
      unread: true,
      unreadCount: 1,
      messages: [
        {
          id: 1,
          sender: "Sneha Iyer",
          text: "Please check my resume draft.",
          time: "Sep 3",
          mine: false,
        },
      ],
    },
    {
      id: 9,
      name: "Rohit Das",
      role: "Alumni, Deloitte (Consultant '16)",
      lastMessage: "Ping me anytime.",
      time: "Sep 2",
      unread: false,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: "You",
          text: "Can you guide me for case interviews?",
          time: "Sep 2",
          mine: true,
        },
        {
          id: 2,
          sender: "Rohit Das",
          text: "Sure, ping me anytime.",
          time: "Sep 2",
          mine: false,
        },
      ],
    },
    {
      id: 10,
      name: "Aditi Menon",
      role: "Alumni, Apple (UX Designer '18)",
      lastMessage: "We can schedule a mock portfolio review.",
      time: "Aug 30",
      unread: false,
      unreadCount: 0,
      messages: [
        {
          id: 1,
          sender: "Aditi Menon",
          text: "I can help you polish your design portfolio.",
          time: "Aug 30",
          mine: false,
        },
        {
          id: 2,
          sender: "You",
          text: "That would be amazing, thanks!",
          time: "Aug 30",
          mine: true,
        },
        {
          id: 3,
          sender: "Aditi Menon",
          text: "We can schedule a mock portfolio review.",
          time: "Aug 30",
          mine: false,
        },
      ],
    },
  ];

  const forums = [
    {
      id: 1,
      name: "AI & Machine Learning Circle",
      members: 340,
      category: "Technology",
      lastActivity: "5m ago",
      tag: "AI/ML",
      badge: "Hot",
      description:
        "For alumni and students passionate about AI, ML, and Generative AI research.",
      posts: [
        {
          id: 1,
          author: "Anjali Gupta",
          role: "Alumni, Amazon DS '19",
          content:
            "Has anyone tried fine-tuning LLMs on custom datasets? What resources helped you?",
          time: "10m ago",
          replies: [
            {
              id: 1,
              author: "Rahul Verma",
              content: "I used Hugging Face tutorials, super helpful!",
              time: "8m ago",
            },
            {
              id: 2,
              author: "Neha Sharma",
              content: "Check out Google’s TensorFlow guides too.",
              time: "6m ago",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Entrepreneurship & Startups",
      members: 180,
      category: "Business",
      lastActivity: "30m ago",
      tag: "Startup",
      badge: "Active",
      description:
        "A hub for alumni founders, VCs, and students to discuss building startups.",
      posts: [
        {
          id: 1,
          author: "Vikram Singh",
          role: "Alumni, Microsoft PM",
          content:
            "We’re launching a startup competition next month. Who’s interested in pitching?",
          time: "1h ago",
          replies: [
            {
              id: 1,
              author: "Priya Nair",
              content: "Count me in! Need more details.",
              time: "50m ago",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Cybersecurity Network",
      members: 95,
      category: "Technology",
      lastActivity: "1h ago",
      tag: "Security",
      description:
        "Dedicated to alumni working in cybersecurity and ethical hacking.",
      posts: [
        {
          id: 1,
          author: "Karan Patel",
          role: "Alumni, Meta AR/VR",
          content: "Anyone attending the Black Hat conference this year?",
          time: "2h ago",
          replies: [
            {
              id: 1,
              author: "Rohit Das",
              content: "Yes, I’ll be there virtually.",
              time: "1h ago",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Career Guidance & Referrals",
      members: 420,
      category: "Mentorship",
      lastActivity: "Today",
      tag: "Career",
      badge: "Popular",
      description:
        "Alumni helping students with job search, resume reviews, and referrals.",
      posts: [
        {
          id: 1,
          author: "Neha Sharma",
          role: "Alumni, Google SWE",
          content:
            "Anyone applying for SDE internships at Google? I can refer.",
          time: "2h ago",
          replies: [
            {
              id: 1,
              author: "Rahul Verma",
              content: "Yes please! I’ll DM you my resume.",
              time: "1h ago",
            },
            {
              id: 2,
              author: "You",
              content: "That’s generous of you, thanks Neha!",
              time: "55m ago",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      name: "Higher Studies Abroad",
      members: 210,
      category: "Academics",
      lastActivity: "Yesterday",
      tag: "MS/PhD",
      description:
        "For alumni and students discussing GRE, IELTS, applications, and universities abroad.",
      posts: [
        {
          id: 1,
          author: "Sneha Iyer",
          role: "Final Year Student",
          content: "Which is better for MS in AI — CMU or Stanford?",
          time: "1d ago",
          replies: [
            {
              id: 1,
              author: "Priya Nair",
              content: "Both are great, depends on research interests.",
              time: "23h ago",
            },
          ],
        },
      ],
    },
    {
      id: 6,
      name: "Blockchain & Web3 Enthusiasts",
      members: 160,
      category: "Technology",
      lastActivity: "2d ago",
      tag: "Web3",
      badge: "Trending",
      description:
        "Discuss crypto, smart contracts, and decentralized apps with alumni builders.",
      posts: [
        {
          id: 1,
          author: "Vikram Singh",
          content:
            "Is Solidity still the best choice for smart contracts in 2025?",
          time: "2d ago",
          replies: [
            {
              id: 1,
              author: "Karan Patel",
              content: "Rust (for Solana) is gaining traction too.",
              time: "2d ago",
            },
          ],
        },
      ],
    },
    {
      id: 7,
      name: "Product Management Circle",
      members: 275,
      category: "Business",
      lastActivity: "3d ago",
      tag: "PM",
      description:
        "A community for aspiring and current PMs to share learnings.",
      posts: [
        {
          id: 1,
          author: "Aditi Menon",
          role: "Alumni, Apple UX",
          content:
            "What’s the most challenging part of being a PM in Big Tech?",
          time: "3d ago",
          replies: [
            {
              id: 1,
              author: "Vikram Singh",
              content: "Prioritization and stakeholder management!",
              time: "3d ago",
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: "Design & Creativity Hub",
      members: 120,
      category: "Design",
      lastActivity: "4d ago",
      tag: "Design",
      badge: "Creative",
      description:
        "For alumni designers and creative professionals to share portfolios & ideas.",
      posts: [
        {
          id: 1,
          author: "Aditi Menon",
          content: "What are the best tools for prototyping in 2025?",
          time: "4d ago",
          replies: [
            {
              id: 1,
              author: "You",
              content: "Figma is still the king 👑",
              time: "4d ago",
            },
          ],
        },
      ],
    },
    {
      id: 9,
      name: "Women in Tech",
      members: 310,
      category: "Community",
      lastActivity: "5d ago",
      tag: "WiT",
      badge: "Supportive",
      description:
        "A safe space for female alumni & students to network and uplift each other.",
      posts: [
        {
          id: 1,
          author: "Sneha Iyer",
          content: "Any upcoming scholarships for women in STEM?",
          time: "5d ago",
          replies: [
            {
              id: 1,
              author: "Priya Nair",
              content: "Check AnitaB.org and Grace Hopper scholarships.",
              time: "5d ago",
            },
          ],
        },
      ],
    },
    {
      id: 10,
      name: "Sports & Fitness Club",
      members: 85,
      category: "Lifestyle",
      lastActivity: "1w ago",
      tag: "Fitness",
      description:
        "Alumni and students sharing health, fitness & sports updates.",
      posts: [
        {
          id: 1,
          author: "Rahul Verma",
          content: "Who’s joining the Alumni Football Match this Sunday?",
          time: "1w ago",
          replies: [
            {
              id: 1,
              author: "Rohit Das",
              content: "Count me in ⚽",
              time: "6d ago",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="messages-container">
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

        {/* Chats Layout */}
        {activeTab === "chats" && (
          <div className="split-layout">
            <div className="list-panel">
              <SearchBar
                value={chatQuery}
                onChange={setChatQuery}
                placeholder="Search chats..."
              />
              <ChatList
                items={chats}
                query={chatQuery}
                onSelect={setActiveChat}
                activeChat={activeChat}
              />
            </div>
            <div className="window-panel">
              {activeChat ? (
                <ChatWindow
                  chat={activeChat}          // current chat data
                  onBack={() => setActiveChat(null)} // child can reset parent state
                />
              ) : (
                <div className="placeholder">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        )}

        {/* Communities Layout */}
        {activeTab === "community" && (
          <div className="split-layout">
            <div className="list-panel">
              <SearchBar
                value={forumQuery}
                onChange={setForumQuery}
                placeholder="Search communities..."
              />
              <ForumList
                items={forums}
                query={forumQuery}
                onOpen={setActiveForum}
                activeForum={activeForum}
              />
            </div>
            <div className="window-panel">
              {activeForum ? (
                <ForumWindow 
                forum={activeForum} 
                onBack={() => setActiveForum(null)}
                />
              ) : (
                <div className="placeholder">
                  Select a community to view details
                </div>
              )}
            </div>


          </div>
        )}
      </div>

      {/* Right Filter Section */}
      <div className="messages-filter">{/* Placeholder for filters */}</div>
    </div>
  );
}
