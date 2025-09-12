import React, { useState } from "react";
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx"; 
import Messages from "./pages/Messages.jsx"; 
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
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
    <div>
    <div className="flex">
      <Navbar onSelectPage={handleSelectPage} selectedPage={selectedPage} />
      <main className="content-area">{renderContent()}</main>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
