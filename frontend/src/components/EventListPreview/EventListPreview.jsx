import React from "react";
import "./EventListPreview.css";

export default function EventListPreview() {
  const events = [
    { id: 1, title: "Alumni Meet 2025", date: "Jan 15, 2025" },
    { id: 2, title: "Career Guidance Webinar", date: "Feb 20, 2025" },
  ];

  return (
    <div className="event-preview">
      <h2>Upcoming Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
