import React from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import Messages from "./pages/Messages.jsx";
import AddPost from "./pages/AddPost.jsx";
import AddEvent from "./pages/AddEvent.jsx";
import Profile from "./pages/Profile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Contact from "./pages/Contact.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup" || location.pathname=="/notfound";

  return (
    <div className="flex">
      {!hideNavbar && <Navbar />}
      <main className="content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notfound" element={<div>404: Page not found.</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
