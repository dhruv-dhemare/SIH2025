import React, { useMemo, useState } from "react";
import alumniData from "../data/alumni.json";
import Card from "../components/Card/Card";
import Modal from "../components/Modal/Modal";

export default function AlumniDirectory() {
  const [query, setQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const skills = useMemo(() => {
    const s = new Set();
    alumniData.forEach(a => a.skills.forEach(k => s.add(k)));
    return Array.from(s).sort();
  }, []);

  const years = useMemo(() => {
    const y = new Set();
    alumniData.forEach(a => y.add(a.gradYear));
    return Array.from(y).sort((a,b)=>b-a);
  }, []);

  const filtered = useMemo(() => {
    return alumniData.filter(a => {
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (skillFilter && !a.skills.includes(skillFilter)) return false;
      if (yearFilter !== "all" && String(a.gradYear) !== String(yearFilter)) return false;
      return true;
    });
  }, [query, skillFilter, yearFilter]);

  return (
    <div>
      <div className="page-title">
        <h1>Alumni Directory</h1>
      </div>

      <div className="controls">
        <input className="search-input" placeholder="Search by name..." value={query} onChange={e => setQuery(e.target.value)} />
        <select className="search-input" value={skillFilter} onChange={e=>setSkillFilter(e.target.value)}>
          <option value="">All skills</option>
          {skills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="search-input" value={yearFilter} onChange={e=>setYearFilter(e.target.value)}>
          <option value="all">All years</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <button className="btn ghost" onClick={()=>{setQuery(''); setSkillFilter(''); setYearFilter('all')}}>Reset</button>
      </div>

      <div className="grid alumni">
        {filtered.map(al => (
          <Card key={al.id} title={al.name} subtitle={`${al.gradYear} • ${al.degree}`} onClick={() => setSelected(al)}>
            <div className="meta">
              <span>{al.jobTitle} @ {al.company}</span>
              <span>{al.location}</span>
            </div>
            <div style={{marginTop:8}}>
              {al.skills.slice(0,3).map(s => <span key={s} style={{display:'inline-block', marginRight:8, fontSize:13, color:'#374151'}}>{s}</span>)}
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={!!selected} title={selected?.name || ""} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <p><strong>{selected.jobTitle}</strong> at <strong>{selected.company}</strong></p>
            <p>{selected.bio}</p>
            <p style={{marginTop:10}}><strong>Skills:</strong> {selected.skills.join(", ")}</p>
            <p style={{marginTop:10}}><strong>Contact:</strong> <a href={`mailto:${selected.email}`}>{selected.email}</a></p>
            <div style={{marginTop:12}}>
              <button className="btn">Request Mentorship</button>
              <button className="btn ghost" style={{marginLeft:8}}>View Profile</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
