// // src/components/ForumList.jsx
// import React from "react";
// import "./ForumList.css";

// export default function ForumList({ items = [], query = "", onOpen }) {
//   const q = query.trim().toLowerCase();
//   const filtered = q
//     ? items.filter(
//         (g) =>
//           g.name.toLowerCase().includes(q) ||
//           (g.tag || "").toLowerCase().includes(q)
//       )
//     : items;

//   return (
//     <ul className="forum-list">
//       {filtered.map((g) => (
//         <li key={g.id} className="forum-card" onClick={() => onOpen?.(g)}>
//           <div className="forum-top">
//             <div className="forum-icon">#</div>
//             <div className="forum-meta">
//               <h4>{g.name}</h4>
//               <p>{g.members} members • {g.category}</p>
//             </div>
//             <span className="forum-activity">{g.lastActivity}</span>
//           </div>
//           <div className="forum-tags">
//             {g.tag && <span className="forum-chip">{g.tag}</span>}
//             {g.badge && <span className="forum-chip alt">{g.badge}</span>}
//           </div>
//         </li>
//       ))}
//       {filtered.length === 0 && <li className="forum-empty">No communities found.</li>}
//     </ul>
//   );
// }

// src/components/ForumList.jsx
import React from "react";
import "./ForumList.css";

export default function ForumList({ items = [], query = "", onOpen }) {
  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          (g.tag || "").toLowerCase().includes(q)
      )
    : items;

  if (filtered.length === 0) {
    return <div className="forum-empty">No communities found.</div>;
  }

  return (
    <ul className="forum-list">
      {filtered.map((forum) => (
        <li
          key={forum.id}
          className="forum-item"
          onClick={() => onOpen?.(forum)}
        >
          <div className="forum-row">
            <h4 className="forum-title">{forum.name}</h4>
            <span className="forum-time">{forum.lastActivity}</span>
          </div>
          <p className="forum-desc">
            {forum.members} members • {forum.category}
          </p>
          {forum.tag && (
            <div className="forum-tags">
              <span className="forum-tag">{forum.tag}</span>
              {forum.badge && (
                <span className="forum-tag highlight">{forum.badge}</span>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
