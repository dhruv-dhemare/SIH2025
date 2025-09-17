// App.jsx (the almost final code)
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
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Landing from "./pages/Landing.jsx";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getProfile } from "./services/api";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Simple token validation: try fetching profile
  const [isValid, setIsValid] = React.useState(null); // null = loading
  React.useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    getProfile(token)
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [token]);

  if (isValid === null) return <div>Loading...</div>; // or spinner
  if (!isValid) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  const location = useLocation();

  // Paths where Navbar should be hidden
  const hideNavbarPaths = ["/login", "/signup", "/"];
  const hideNavbar = hideNavbarPaths.includes(location.pathname.toLowerCase());

  return (
    <div className="flex">
      {!hideNavbar && <Navbar />}
      <main className="content-area">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addpost"
            element={
              <ProtectedRoute>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addevent"
            element={
              <ProtectedRoute>
                <AddEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />

          {/* Fallback 404 */}
          <Route path="*" element={<div>404: Page not found.</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
