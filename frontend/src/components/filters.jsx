import React from "react";
import { useNavigate } from "react-router-dom";
import "./Filters.css";

const Filters = ({ filter, setFilter, showAddPost = false, showEventPost = false }) => {
  const navigate = useNavigate();

  const handleChange = (group, value) => {
    setFilter({ ...filter, [group]: value });
  };

  return (
    <div className="filters-sidebar">
      <h3>Filters</h3>

      {/* ✅ Search by user type */}
      <div className="filter-group">
        <h4>Search For</h4>
        <label className="filter-option">
          <input
            type="radio"
            name="userType"
            value="all"
            checked={filter.userType === "all"}
            onChange={() => handleChange("userType", "all")}
          />
          <span className="checkmark"></span>
          Show All
        </label>
        {["alumni", "recruiter", "faculty"].map((type) => (
          <label key={type} className="filter-option">
            <input
              type="radio"
              name="userType"
              value={type}
              checked={filter.userType === type}
              onChange={() => handleChange("userType", type)}
            />
            <span className="checkmark"></span>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </div>

      {/* ✅ Category */}
      <div className="filter-group">
        <h4>Category</h4>
        <label className="filter-option">
          <input
            type="radio"
            name="category"
            value="all"
            checked={filter.category === "all"}
            onChange={() => handleChange("category", "all")}
          />
          <span className="checkmark"></span>
          Show All
        </label>
        {["opportunities", "general", "tech", "business"].map((cat) => (
          <label key={cat} className="filter-option">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filter.category === cat}
              onChange={() => handleChange("category", cat)}
            />
            <span className="checkmark"></span>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </label>
        ))}
      </div>

      {/* ✅ Sort by */}
      <div className="filter-group">
        <h4>Sort By</h4>
        <label className="filter-option">
          <input
            type="radio"
            name="sortBy"
            value="all"
            checked={filter.sortBy === "all"}
            onChange={() => handleChange("sortBy", "all")}
          />
          <span className="checkmark"></span>
          Show All
        </label>
        {["recent", "popular", "liked", "commented"].map((sort) => (
          <label key={sort} className="filter-option">
            <input
              type="radio"
              name="sortBy"
              value={sort}
              checked={filter.sortBy === sort}
              onChange={() => handleChange("sortBy", sort)}
            />
            <span className="checkmark"></span>
            {sort === "recent"
              ? "Most Recent"
              : sort.charAt(0).toUpperCase() + sort.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
