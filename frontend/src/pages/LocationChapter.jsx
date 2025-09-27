import React, { useState } from "react";
import "./LocationChapter.css";

function LocationChapter() {
  const [showMembers, setShowMembers] = useState(false);

  const notifications = [
  {
    alumni: "Amit Sharma",
    title: "donated ₹50,000 for AI Lab in college",
    date: "12 Sep 2025",
    icon: "💰"
  },
  {
    alumni: "Priya Verma",
    title: "helped alumni Rohit Mehra shift to a new city",
    date: "20 Aug 2025",
    icon: "🤝"
  },
  {
    alumni: "Sneha Kapoor",
    title: "organized AI mentorship session for students",
    date: "5 Oct 2025",
    icon: "🧑‍🏫"
  },
  {
    alumni: "Arjun Nair",
    title: "sponsored AI hackathon snacks and refreshments",
    date: "18 Sep 2025",
    icon: "🍽️"
  },
];


  const members = [
  "Sneha Kapoor (MBA, 2021) ", "Arjun Nair (ME, 2017)", "Kavya Singh (CSE, 2016)",
  "Rakesh Gupta (ECE, 2018)", "Anjali Rao (IT, 2019)", "Vikram Joshi (ME, 2020)",
  "Pooja Chawla (MBA, 2021)", "Rahul Desai (CSE, 2017)", "Simran Kaur (ECE, 2018)",
  "Aditya Malhotra (IT, 2019)", "Neha Patil (ME, 2020)", "Siddharth Iyer (CSE, 2016)",
  "Ananya Reddy (ECE, 2017)", "Karan Mehta (IT, 2018)", "Divya Nair (MBA, 2019)",
  "Manish Kapoor (ME, 2020)", "Riya Sharma (CSE, 2021)", "Saurabh Jain (ECE, 2017)",
  "Tanya Verma (IT, 2018)", "Harsh Singh (ME, 2019)", "Priyanka Dubey (MBA, 2020)",
  "Vivek Sharma (CSE, 2016)", "Shreya Menon (ECE, 2017)", "Nikhil Reddy (IT, 2018)",
  "Ankita Ghosh (ME, 2019)", "Aakash Choudhary (MBA, 2020)", "Meera Joshi (CSE, 2017)",
  "Rohini Gupta (ECE, 2018)", "Arjun Singh (IT, 2019)", "Nisha Patel (ME, 2020)",
  "Kunal Sharma (CSE, 2016)", "Isha Kapoor (ECE, 2017)", "Rajat Verma (IT, 2018)",
  "Sonal Mehta (MBA, 2019)", "Pranav Nair (ME, 2020)", "Tanvi Joshi (CSE, 2021)",
  "Aditya Rao (ECE, 2017)", "Maya Singh (IT, 2018)", "Raghav Malhotra (ME, 2019)",
  "Divya Sharma (MBA, 2020)", "Vikram Patel (CSE, 2016)", "Ananya Mehta (ECE, 2017)",
  "Rohit Nair (IT, 2018)", "Sneha Joshi (ME, 2019)", "Karan Gupta (MBA, 2020)",
  "Pooja Sharma (CSE, 2017)", "Rahul Verma (ECE, 2018)", "Simran Kapoor (IT, 2019)",
  "Aditya Singh (ME, 2020)", "Neha Joshi (CSE, 2016)", "Siddharth Patel (ECE, 2017)",
  "Ankita Sharma (IT, 2018)", "Manish Verma (ME, 2019)", "Riya Kapoor (MBA, 2020)",
  "Saurabh Nair (CSE, 2017)", "Tanya Joshi (ECE, 2018)", "Harsh Patel (IT, 2019)",
  "Priyanka Sharma (ME, 2020)", "Vivek Verma (CSE, 2016)", "Shreya Kapoor (ECE, 2017)",
  "Nikhil Joshi (IT, 2018)", "Ankita Patel (MBA, 2019)", "Aakash Sharma (ME, 2020)",
  "Meera Verma (CSE, 2017)", "Rohini Joshi (ECE, 2018)", "Arjun Kapoor (IT, 2019)",
  "Nisha Verma (ME, 2020)", "Kunal Joshi (CSE, 2016)", "Isha Sharma (ECE, 2017)",
  "Rajat Kapoor (IT, 2018)", "Sonal Verma (MBA, 2019)", "Pranav Sharma (ME, 2020)",
  "Tanvi Verma (CSE, 2021)", "Aditya Joshi (ECE, 2017)", "Maya Kapoor (IT, 2018)",
  "Raghav Sharma (ME, 2019)", "Divya Joshi (MBA, 2020)", "Vikram Kapoor (CSE, 2016)",
  "Ananya Sharma (ECE, 2017)", "Rohit Kapoor (IT, 2018)"
];


  const upcomingActivities = [
    {
      title: "Delhi Alumni Mixer",
      date: "15 Oct 2025",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Tech Talk: AI in Startups",
      date: "28 Oct 2025",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=60",
    },
  ];

  const pastActivities = [
    {
      title: "Fundraising Dinner",
      date: "12 Aug 2025",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=60",
    },
    {
      title: "Job Fair – Delhi NCR",
      date: "20 July 2025",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <div className="chapter-container">
      <h1>Alumni Chapter – Delhi</h1>
      <p className="chapter-desc">
        Connect with alumni in Delhi, grow your network, and be part of local
        events, activities, and opportunities.
      </p>
      {/* Notifications Section */}
      <div className="notifications-section">
        <h2>🔔 Chapter Notifications</h2>
        <ul>
          {notifications.map((notif, index) => (
            <li key={index} className="notification-item">
              <span className="notif-icon">{notif.icon}</span>
              <span className="notif-text">
                <strong>{notif.alumni}</strong> {notif.title} – {notif.date}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Members Section */}
      <center>
        <div
        className="members-card"
        onClick={() => setShowMembers(true)}
      >
        <p>👥 {members.length}  Members 👥</p>
        <span className="view-more">Click to view</span>
      </div>
      </center>

      {/* Modal for Members */}
      {showMembers && (
        <div className="modal-overlay" onClick={() => setShowMembers(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Delhi Chapter Members</h2>
            <ul>
              {members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
            <button className="close-btn" onClick={() => setShowMembers(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Activities Section */}
      <div className="activities-section">
  <h2>📅 Upcoming Activities</h2>
  <div className="activities-grid">
    {upcomingActivities.map((activity, index) => (
      <div key={index} className="activity-item">
        <img src={activity.image} alt={activity.title} className="activity-image" />
        <div className="activity-info">
          <strong>{activity.title}</strong> – {activity.date}
        </div>
      </div>
    ))}
  </div>

  <h2>✅ Past Activities</h2>
  <div className="activities-grid">
    {pastActivities.map((activity, index) => (
      <div key={index} className="activity-item">
        <img src={activity.image} alt={activity.title} className="activity-image" />
        <div className="activity-info">
          <strong>{activity.title}</strong> – {activity.date}
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}

export default LocationChapter;
