import React from "react";
import EventListPreview from "../components/EventListPreview/EventListPreview";

export default function Dashboard(){
  return (
    <div>
      <div className="page-title"><h1>Admin Dashboard</h1></div>
      <p>Placeholder dashboard. Put analytics widgets here.</p>
      <EventListPreview />
    </div>
  )
}
