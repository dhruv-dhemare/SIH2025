import React, { useState, useMemo } from "react";
import eventsData from "../data/events.json";
import Card from "../components/Card/Card";
import Modal from "../components/Modal/Modal";

export default function Events() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("upcoming"); // all / upcoming / past
  const [selected, setSelected] = useState(null);
  const [rsvps, setRsvps] = useState({}); // { eventId: [ {name,email} ] }

  const todayISO = new Date().toISOString().slice(0,10);

  const events = useMemo(() => {
    let arr = [...eventsData];
    if (filter === "upcoming") arr = arr.filter(e => e.date >= todayISO);
    if (filter === "past") arr = arr.filter(e => e.date < todayISO);
    if (query.trim()) {
      arr = arr.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));
    }
    // sort by date asc
    arr.sort((a,b) => a.date.localeCompare(b.date));
    return arr;
  }, [query, filter]);

  const handleRsvp = (eventId, name, email) => {
    setRsvps(prev => {
      const list = prev[eventId] ? [...prev[eventId]] : [];
      list.push({ name, email, time: new Date().toISOString() });
      return { ...prev, [eventId]: list };
    });
    alert("RSVP successful — we'll send a confirmation email (demo).");
  };

  return (
    <div>
      <div className="page-title">
        <h1>Events</h1>
      </div>

      <div className="controls">
        <input className="search-input" placeholder="Search events..." value={query} onChange={e => setQuery(e.target.value)} />
        <div style={{display:'flex', gap:8}}>
          <button className={`btn ${filter==='all'?'ghost':''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`btn ${filter==='upcoming'?'':'ghost'}`} onClick={() => setFilter('upcoming')}>Upcoming</button>
          <button className={`btn ${filter==='past'?'ghost':''}`} onClick={() => setFilter('past')}>Past</button>
        </div>
      </div>

      <div className="grid events">
        {events.map(ev => (
          <Card key={ev.id} title={ev.title} subtitle={`${ev.date} • ${ev.location}`} onClick={() => setSelected(ev)}>
            <p style={{fontSize:14, color:'#374151'}}>{ev.description}</p>
            <div className="meta">
              <span>{ev.capacity} seats</span>
              <span>{ (rsvps[ev.id] || []).length } RSVP'd</span>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={!!selected} title={selected?.title || ""} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <p><strong>Date:</strong> {selected.date}</p>
            <p><strong>Location:</strong> {selected.location}</p>
            <p style={{marginTop:8}}>{selected.description}</p>

            <RSVPForm eventId={selected.id} onRsvp={handleRsvp} />
            <div style={{marginTop:12}}>
              <h4>Attendees (demo)</h4>
              <ul>
                {(rsvps[selected.id] || []).map((a, i) => <li key={i}>{a.name} — {a.email}</li>)}
                {(!rsvps[selected.id] || rsvps[selected.id].length===0) && <li style={{color:'#6b7280'}}>No RSVPs yet</li>}
              </ul>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

/* small RSVP form component inside same file for simplicity */
function RSVPForm({ eventId, onRsvp }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div style={{marginTop:12}}>
      <h4>RSVP</h4>
      <input className="search-input" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="search-input" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} style={{marginTop:8}} />
      <div style={{marginTop:8}}>
        <button className="btn" onClick={() => { if(!name||!email){ alert('Enter name & email'); return } onRsvp(eventId, name, email); setName(''); setEmail('') }}>Confirm RSVP</button>
      </div>
    </div>
  );
}
