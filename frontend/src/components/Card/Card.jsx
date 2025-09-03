import React from "react";
import "./Card.css";

export default function Card({ title, subtitle, children, onClick }) {
  return (
    <article className="card" onClick={onClick}>
      <div>
        <h3>{title}</h3>
        {subtitle && <div className="meta">{subtitle}</div>}
      </div>
      <div style={{marginTop:10}}>{children}</div>
    </article>
  );
}
