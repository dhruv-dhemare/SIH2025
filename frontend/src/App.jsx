// App.jsx
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
import { Routes, Route } from "react-router-dom";

function App() {
  const [selectedPage, setSelectedPage] = useState("home");

  const handleSelectPage = (pageName) => {
    setSelectedPage(pageName);
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "home":
        return <Home />;
      case "events":
        return <Events />;
      case "messages":
        return <Messages />;
      default:
        return <div>404: Page not found.</div>;
    }
  };

  return (
    <div className="flex">
      <Navbar onSelectPage={handleSelectPage} selectedPage={selectedPage} />
      <main className="content-area">{renderContent()}</main>
    </div>
  );
}

export default App;
