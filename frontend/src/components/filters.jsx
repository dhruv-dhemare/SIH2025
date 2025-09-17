// import React from "react";
// import { useNavigate } from "react-router-dom"; 
// import "./Filters.css";

// const Filters = ({ filter, setFilter, filterOptions, showAddPost = false ,showEventPost = false }) => {
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFilter({ ...filter, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="filters-sidebar">
//       <h3>Filters</h3>

//       {Object.keys(filterOptions).map((filterKey) => (
//         <select
//           key={filterKey}
//           name={filterKey}
//           value={filter[filterKey] || ""}
//           onChange={handleChange}
//         >
//           {filterOptions[filterKey].map((opt) => (
//             <option key={opt.value} value={opt.value}>
//               {opt.label}
//             </option>
//           ))}
//         </select>
//       ))}

//       {showAddPost && (
//         <button
//           className="add-post-btn"
//           onClick={() => navigate("/addpost")}
//         >
//           + Add Post
//         </button>
//       )}
//       {showEventPost && (
//         <button
//           className="add-post-btn"
//           onClick={() => navigate("/addevent")}
//         >
//           + Add Event
//         </button>
//       )}
//     </div>
//   );
// };

// export default Filters;


import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Filters.css";

const Filters = ({
  filter,
  setFilter,
  filterOptions,
  showAddPost = false,
  showEventPost = false
}) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="filters-sidebar">
      <h3>Filters</h3>

      {/* Dynamic filter dropdowns */}
      {Object.keys(filterOptions).map((filterKey) => (
        <div className="filter-select" key={filterKey}>
          <label>{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</label>
          <select
            name={filterKey}
            value={filter[filterKey] || ""}
            onChange={handleChange}
          >
            {filterOptions[filterKey].map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Add Post / Add Event buttons */}
      {showAddPost && (
        <button
          className="add-post-btn"
          onClick={() => navigate("/addpost")}
        >
          + Add Post
        </button>
      )}
      {showEventPost && (
        <button
          className="add-post-btn"
          onClick={() => navigate("/addevent")}
        >
          + Add Event
        </button>
      )}
    </div>
  );
};

export default Filters;
