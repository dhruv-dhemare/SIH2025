import React from "react";
import { useNavigate } from "react-router-dom";
import "./Filters.css";

const Filters = ({ filter, setFilter, filterOptions = {}, showAddPost = false, showEventPost = false }) => {
  const navigate = useNavigate();

  const handleChange = (group, value) => {
    setFilter({ ...filter, [group]: value });
  };

  return (
    <div className="filters-sidebar">
      <h3>Filters</h3>

      {/* ✅ Dynamically render filter groups */}
      {Object.keys(filterOptions).map((group) => (
        <div className="filter-group" key={group}>
          <h4>{group.charAt(0).toUpperCase() + group.slice(1)}</h4>
          {filterOptions[group].map((option) => (
            <label key={option.value} className="filter-option">
              <input
                type="radio"
                name={group}
                value={option.value}
                checked={filter[group] === option.value}
                onChange={() => handleChange(group, option.value)}
              />
              <span className="checkmark"></span>
              {option.label}
            </label>
          ))}
        </div>
      ))}

      {/* ✅ Example Add Post / Event buttons */}
      {showAddPost && (
        <button className="add-post-btn" onClick={() => navigate("/add-post")}>
          ➕ Add Post
        </button>
      )}

      {showEventPost && (
        <button className="add-event-btn" onClick={() => navigate("/add-event")}>
          🎉 Add Event
        </button>
      )}
    </div>
  );
};

export default Filters;
