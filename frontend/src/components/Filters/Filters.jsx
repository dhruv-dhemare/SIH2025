// src/components/Filters.jsx
import React from "react";
import "./Filters.css";

export default function Filters({ filters, setFilters, openFilter, setOpenFilter }) {
  const toggleFilter = (filter) => {
    setFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const toggleDropdown = (section) => {
    setOpenFilter(openFilter === section ? null : section);
  };

  return (
    <div className="filters">
      <h4>Filters</h4>

      <div className="filter-dropdown">
        <button onClick={() => toggleDropdown("domain")}>Domains ⬇</button>
        {openFilter === "domain" && (
          <div className="filter-options">
            {["AI/ML", "Business", "Data Science", "Entrepreneurship"].map((f) => (
              <label key={f}>
                <input
                  type="checkbox"
                  checked={filters.includes(f)}
                  onChange={() => toggleFilter(f)}
                />
                {f}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-dropdown">
        <button onClick={() => toggleDropdown("engagement")}>Engagement ⬇</button>
        {openFilter === "engagement" && (
          <div className="filter-options">
            {["Trending", "Most Liked", "Recent"].map((f) => (
              <label key={f}>
                <input
                  type="checkbox"
                  checked={filters.includes(f)}
                  onChange={() => toggleFilter(f)}
                />
                {f}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
