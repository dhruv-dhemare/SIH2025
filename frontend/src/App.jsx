import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx"; 
import Messages from "./pages/Messages.jsx"; 
import Profile from "./components/profile/profile";

function App() {
  const [selectedPage, setSelectedPage] = useState("home");

  const handleSelectPage = (pageName) => setSelectedPage(pageName);

  const renderContent = () => {
    switch (selectedPage) {
      case "home":
        return <Home />;
      case "events":
        return <Events />;
      case "messages":
        return <Messages />;
      case "profile":
        return <Profile />;
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

