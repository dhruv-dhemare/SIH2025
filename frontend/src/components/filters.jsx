import React from "react";
import "./Filters.css";

const Filters = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="filters-sidebar">
      <h3>Filters</h3>

      <select name="sortBy" value={filter.sortBy} onChange={handleChange}>
        <option value="recent">Most Recent</option>
        <option value="popular">Most Popular</option>
        <option value="liked">Most Liked</option>
        <option value="commented">Most Commented</option>
      </select>

      <select name="category" value={filter.category} onChange={handleChange}>
        <option value="all">All</option>
        <option value="tech">Technology</option>
        <option value="education">Education</option>
        <option value="business">Business</option>
        <option value="design">Design</option>
        <option value="finance">Finance</option>
      </select>

      <select
        name="timeframe"
        value={filter.timeframe || "anytime"}
        onChange={handleChange}
      >
        <option value="anytime">Anytime</option>
        <option value="24h">Last 24 hours</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>

      <select
        name="connections"
        value={filter.connections || "all"}
        onChange={handleChange}
      >
        <option value="all">All Connections</option>
        <option value="1st">1st Degree</option>
        <option value="2nd">2nd Degree</option>
        <option value="3rd">3rd Degree</option>
      </select>
    </div>
  );
};

export default Filters;