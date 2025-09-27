import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import Filters from "../components/Filters.jsx";
import { Search } from "lucide-react";  // ✅ Import the icon
import "../App.css";

const posts = [
  {
    id: 1,
    userName: "Rahul Mehta",
    userRole: "Alumnus • 2h ago",
    avatar: "https://i.pravatar.cc/40?img=12",
    content: "Excited to share that our company is offering a summer internship program for second and third-year students. It’s a great chance to gain hands-on experience in software development and learn from industry professionals. Apply soon as seats are limited!",
    image: "https://images.rawpixel.com/image_social_portrait/cHJpdmF0ZS90ZW1wbGF0ZXMvZmlsZXMvY3JlYXRlX3Rvb2wvMjAyNC0wMi8wMWhueTBhYWY2M3I0anh5bjJ2eHNiYmJkbi1sczlxcG1mYy5qcGc.jpg",
    category: "internship"
  },
  {
    id: 2,
    userName: "Ananya Sharma",
    userRole: "Recruiter • 5h ago",
    avatar: "https://i.pravatar.cc/40?img=25",
    content: "Our HR team is conducting a placement drive for final-year students specializing in Computer Science and IT. With openings in backend, frontend, and testing roles, this drive is an excellent opportunity to kickstart your career. Don’t miss the deadlines!",
    image: "https://i.pinimg.com/originals/fe/94/3b/fe943b03e56d2d9e6f2f11e8d5a10a0a.jpg",
    category: "placement"
  },
  {
    id: 3,
    userName: "Arjun Patel",
    userRole: "Startup Founder • 7h ago",
    avatar: "https://i.pravatar.cc/40?img=18",
    content: "We’re looking for passionate students to join our in-house project on AI-driven chatbots. It’s unpaid but offers incredible exposure, mentorship, and a certificate. If you’re eager to learn and contribute, this is the perfect place to start!",
    image: "https://tse4.mm.bing.net/th/id/OIP.ot10NgmdtJ6WQ4uSNb0MtQHaEK?pid=Api&P=0&h=180",
    category: "inhouse"
  },
  {
    id: 4,
    userName: "Neha Iyer",
    userRole: "Placement Cell • 1d ago",
    avatar: "https://i.pravatar.cc/40?img=30",
    content: "Infosys will be visiting our campus for a placement drive next week. Students are requested to update their resumes and register on the portal. This is a fantastic chance to join one of India’s leading IT companies right after graduation!",
    image: "https://tse2.mm.bing.net/th/id/OIP.f1vNdZV485zSexlduTiumgHaHa?pid=Api&P=0&h=180",
    category: "placement"
  },
  {
    id: 5,
    userName: "Siddharth Verma",
    userRole: "Research Mentor • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=45",
    content: "Announcing an in-house research project on blockchain applications in supply chain management. Selected students will work closely with professors and industry experts. The project outcome may even get published in reputed journals!",
    image: "https://www.alctraining.com.au/wp-content/uploads/2018/07/shutterstock_1012621969.jpg",
    category: "inhouse"
  },
  {
    id: 6,
    userName: "Priya Nair",
    userRole: "Hiring Manager • 6h ago",
    avatar: "https://i.pravatar.cc/40?img=16",
    content: "We are opening applications for a **paid internship** at our fintech startup in Pune. Interns will get exposure to mobile app development, real-world problem-solving, and direct client interactions. Stipends and PPOs available for top performers!",
    image: "https://i2.wp.com/micagradcommunity.files.wordpress.com/2020/02/internship-career-fair-posters-8.5x11.jpg?w=791",
    category: "internship"
  },
  {
    id: 7,
    userName: "Rohan Gupta",
    userRole: "Placement Cell • 8h ago",
    avatar: "https://i.pravatar.cc/40?img=28",
    content: "TCS is conducting an off-campus placement drive for graduating students. Candidates with strong programming and communication skills are encouraged to apply. Don’t forget to practice aptitude and coding tests before appearing!",
    image: "https://dsce.ac.in/wp-content/uploads/2022/09/IMG-20220921-WA0002.jpg",
    category: "placement"
  },
  {
    id: 8,
    userName: "Simran Kaur",
    userRole: "Startup Co-founder • 1d ago",
    avatar: "https://i.pravatar.cc/40?img=47",
    content: "Our startup is working on an in-house project to build a social networking platform for alumni. We are inviting students who want to gain real project exposure in React, Node.js, and MongoDB. This is your chance to work on a live product!",
    image: "https://tse4.mm.bing.net/th/id/OIP.CK5reDl3eueo1fdrqaBVngHaDu?pid=Api&P=0&h=180",
    category: "inhouse"
  },
  {
    id: 9,
    userName: "Karthik Reddy",
    userRole: "HR Partner • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=20",
    content: "We are hiring interns for our cloud computing division. This internship is unpaid but comes with strong mentorship and a recommendation letter. Ideal for students who want to build a strong technical foundation before placements.",
    image: "https://tse4.mm.bing.net/th/id/OIP.ehDX2xNQ6pVC_XHACmdfnAHaFt?pid=Api&P=0&h=180",
    category: "internship"
  },
  {
    id: 10,
    userName: "Aditi Deshmukh",
    userRole: "Alumni Recruiter • 3d ago",
    avatar: "https://i.pravatar.cc/40?img=35",
    content: "Capgemini is launching a campus placement drive focusing on data engineering and full-stack development roles. Students with project experience in Python, Java, and SQL will be prioritized. Don’t miss this golden opportunity!",
    image: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?q=80&w=1080&auto=format&fit=crop",
    category: "placement"
  },
  {
    id: 11,
    userName: "Nikhil Joshi",
    userRole: "Startup Mentor • 5h ago",
    avatar: "https://i.pravatar.cc/40?img=38",
    content: "Our incubator is offering students a chance to participate in an in-house project on health-tech solutions. You’ll be working with AI and IoT devices to create real impact. Outstanding contributors may get funding support for their ideas!",
    image: "https://tse1.mm.bing.net/th/id/OIP.UUrTnHh-bYCgrI4EL1PDdAHaHa?pid=Api&P=0&h=180",
    category: "inhouse"
  },
  {
    id: 12,
    userName: "Ishita Banerjee",
    userRole: "Placement Coordinator • 6h ago",
    avatar: "https://i.pravatar.cc/40?img=22",
    content: "We’re thrilled to announce that Wipro will be visiting our campus for placements. The process includes an aptitude test, coding round, and personal interviews. Students are advised to polish their basics and soft skills before appearing.",
    image: "https://tse1.mm.bing.net/th/id/OIP.gpN_diOqX0h9fxjD93qO7gHaIP?pid=Api&P=0&h=180",
    category: "placement"
  },
  {
    id: 13,
    userName: "Manoj Kumar",
    userRole: "Senior Developer • 4d ago",
    avatar: "https://i.pravatar.cc/40?img=29",
    content: "Looking for interns to join our product team working on automation tools. This is a **paid internship** with flexible working hours. A great opportunity to learn directly from experienced developers while contributing to production-level code.",
    image: "https://tse2.mm.bing.net/th/id/OIP.3b8hM-ATNAaTn_f5XXwaeAHaDP?pid=Api&P=0&h=180",
    category: "internship"
  },
  {
    id: 14,
    userName: "Shruti Kulkarni",
    userRole: "In-house Project Lead • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=33",
    content: "We are forming a student-led in-house project team to work on a mobile application for college events. This will not only enhance your technical portfolio but also give you visibility among recruiters. Apply if you are passionate about Android/iOS dev!",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1080&auto=format&fit=crop",
    category: "inhouse"
  },
  {
    id: 15,
    userName: "Vikram Singh",
    userRole: "Placement Cell • 12h ago",
    avatar: "https://i.pravatar.cc/40?img=40",
    content: "Amazon is rolling out its campus recruitment process, offering software development roles for graduating engineers. The package and learning opportunities are unmatched. Students, gear up with DSA and system design prep to grab this chance!",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1080&auto=format&fit=crop",
    category: "placement"
  },
  {
    id: 16,
    userName: "Aarav Malhotra",
    userRole: "Alumnus • Startup Founder • 3d ago",
    avatar: "https://i.pravatar.cc/40?img=50",
    content: "Thrilled to share that my ed-tech startup is hiring interns for content development and frontend design. We’re looking for enthusiastic learners who want to experience startup culture first-hand. This could even turn into a full-time role!",
    image: "https://png.pngtree.com/template/20220407/ourlarge/pngtree-business-startup-poster-flat-vector-template-image_953363.jpg",
    category: "startup"
  },
  {
    id: 17,
    userName: "Meera Krishnan",
    userRole: "Alumna • Entrepreneur • 1d ago",
    avatar: "https://i.pravatar.cc/40?img=52",
    content: "As part of our health-tech startup, we’re looking for passionate coders to join as interns. You’ll get exposure to building mobile apps, working on IoT, and brainstorming directly with the founders. This is your chance to work in an agile startup environment!",
    image: "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2J3BCTN/startup-posters-concept-of-launch-start-up-business-with-innovation-ideas-and-technologies-vector-banners-with-isometric-illustration-laptop-charts-2J3BCTN.jpg",
    category: "startup"
  },
  {
    id: 18,
    userName: "Devansh Kapoor",
    userRole: "Alumnus • Startup CEO • 2d ago",
    avatar: "https://i.pravatar.cc/40?img=55",
    content: "My logistics-tech startup is collaborating with colleges to take on interns for UI/UX and backend systems. We strongly believe in nurturing student talent and giving them a chance to build features that impact thousands of users in real-time!",
    image: "https://static.vecteezy.com/system/resources/previews/000/472/054/large_2x/vector-successful-startup-concept-flat-infographic-poster.jpg",
    category: "startup"
  }
];



function Home() {
  const [filter, setFilter] = useState({
    sortBy: "recent",
    category: "all",
    timeframe: "anytime",
    connections: "all",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // ✅ Dynamic filter options
  const filterOptions = {
    // sortBy: [
    //   { label: "Most Recent", value: "recent" },
    //   { label: "Most Popular", value: "popular" },
    //   { label: "Most Liked", value: "liked" },
    //   { label: "Most Commented", value: "commented" },
    // ],
    category: [
      { label: "All", value: "all" },
      { label: "Internship", value: "internship" },
      { label: "Project", value: "inhouse" },
      { label: "Business", value: "startup" },
      { label: "Design", value: "design" },
      { label: "Finance", value: "finance" },
    ],
    timeframe: [
      { label: "Anytime", value: "anytime" },
      { label: "Last 24 hours", value: "24h" },
      { label: "Last 7 days", value: "7d" },
      { label: "Last 30 days", value: "30d" },
    ]
    // connections: [
    //   { label: "All Connections", value: "all" },
    //   { label: "1st Degree", value: "1st" },
    //   { label: "2nd Degree", value: "2nd" },
    //   { label: "3rd Degree", value: "3rd" },
    // ],
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
    if (filter.timeframe === "24h")
      cutoff = new Date(now - 24 * 60 * 60 * 1000);
    else if (filter.timeframe === "7d")
      cutoff = new Date(now - 7 * 24 * 60 * 60 * 1000);
    else if (filter.timeframe === "30d")
      cutoff = new Date(now - 30 * 24 * 60 * 60 * 1000);

    filteredPosts = filteredPosts.filter((post) => post.date >= cutoff);
  }

  if (filter.sortBy === "popular")
    filteredPosts.sort((a, b) => b.comments - a.comments);
  else if (filter.sortBy === "liked")
    filteredPosts.sort((a, b) => b.likes - a.likes);
  else if (filter.sortBy === "commented")
    filteredPosts.sort((a, b) => b.comments - a.comments);
  else filteredPosts.sort((a, b) => b.date - a.date);

  // ✅ Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home-content">
      {/* ✅ Dynamic filters */}
      <Filters
        filter={filter}
        setFilter={setFilter}
        filterOptions={filterOptions}
        showAddPost={false}
      />

      {/* ✅ Search Bar */}

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
