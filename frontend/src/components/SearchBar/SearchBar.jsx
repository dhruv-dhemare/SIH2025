// src/components/SearchBar.jsx
import React from "react";
import "./SearchBar.css";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="searchbar">
      <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 4a6 6 0 104.472 10.028l4.25 4.25 1.414-1.414-4.25-4.25A6 6 0 0010 4zm-4 6a4 4 0 118 0 4 4 0 01-8 0z" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}
