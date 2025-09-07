// import React, { useState } from "react";
// import "./App.css";
// import Navbar from "./components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import Events from "./pages/Events.jsx"; 
// import Messages from "./pages/Messages.jsx"; 

// function App() {
//   const [selectedPage, setSelectedPage] = useState("home");

//   const handleSelectPage = (pageName) => {
//     setSelectedPage(pageName);
//   };

//   const renderContent = () => {
//     switch (selectedPage) {
//       case "home":
//         return <Home />;
//       case "events":
//         return <Events />;
//       case "messages":
//         return <Messages />;
//       default:
//         return <div>404: Page not found.</div>;
//     }
//   };

//   return (
//     <div className="flex">
//       <Navbar onSelectPage={handleSelectPage} selectedPage={selectedPage} />
//       <main className="content-area">{renderContent()}</main>
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/alumni")
      .then(res => res.json())
      .then(data => setAlumni(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {alumni.map((a, i) => (
          <Marker key={i} position={[a.lat, a.lng]}>
            <Popup>
              {a.name} <br /> Pincode: {a.pincode}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
