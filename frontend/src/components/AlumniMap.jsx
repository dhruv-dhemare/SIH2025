// src/components/AlumniMap.jsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css"; // make sure to import your CSS

export default function AlumniMap() {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/alumni")
      .then((res) => res.json())
      .then((data) => setAlumni(data))
      .catch((err) => console.error(err));
  }, []);

  // Generate random pastel color per country
  const countryColors = {};
  const getColor = (country) => {
    if (!countryColors[country]) {
      const r = Math.floor(Math.random() * 156 + 100);
      const g = Math.floor(Math.random() * 156 + 100);
      const b = Math.floor(Math.random() * 156 + 100);
      countryColors[country] = `rgb(${r},${g},${b})`;
    }
    return countryColors[country];
  };

  // Circular marker icon
  const createMarkerIcon = (name, color) =>
    L.divIcon({
      html: `<div class="alumni-marker" style="background-color: ${color}">${name.charAt(0)}</div>`,
      className: "",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {alumni
        .filter((a) => a.lat && a.lng)
        .map((a, i) => (
          <Marker
            key={i}
            position={[a.lat, a.lng]}
            icon={createMarkerIcon(a.name, getColor(a.country))}
          >
            <Popup>
              <h3>{a.name}</h3>
              <p>Pincode: {a.pincode}</p>
              <p>Country: {a.country}</p>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
