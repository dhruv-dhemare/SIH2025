import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import AlumniDirectory from "./pages/AlumniDirectory";
import Mentorship from "./pages/Mentorship";
import Messages from "./pages/Messages";
import Donations from "./pages/Donations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/alumni" element={<AlumniDirectory />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
