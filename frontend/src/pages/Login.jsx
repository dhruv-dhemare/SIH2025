import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email,setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <div style={{maxWidth:420}}>
      <h2>Login (demo)</h2>
      <input className="search-input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <div style={{marginTop:12}}>
        <button className="btn" onClick={()=>navigate("/dashboard")}>Login</button>
      </div>
    </div>
  );
}
