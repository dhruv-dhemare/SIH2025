//this is the landing page
import React from "react";

export default function LandingPage() {
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    color: "#fff",
    fontFamily: `"Segoe UI", Roboto, sans-serif`,
    minWidth: "100vw"
  };

  const contentStyle = {
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.08)",
    padding: "3rem 4rem",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    animation: "fadeIn 1s ease-out",
  };

  const titleStyle = {
    fontSize: "3rem",
    marginBottom: "2rem",
    letterSpacing: "1px",
  };

  const buttonsWrapper = {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
  };

  const buttonStyle = {
    textDecoration: "none",
    color: "#fff",
    padding: "0.9rem 2rem",
    borderRadius: "50px",
    fontSize: "1.1rem",
    fontWeight: 600,
    background: "rgba(255,255,255,0.15)",
    border: "2px solid #fff",
    transition: "all 0.3s ease",
  };

  const handleHover = (e, hover) => {
    e.target.style.background = hover ? "#fff" : "rgba(255,255,255,0.15)";
    e.target.style.color = hover ? "#2575fc" : "#fff";
    e.target.style.transform = hover ? "translateY(-3px)" : "translateY(0)";
    e.target.style.boxShadow = hover
      ? "0 8px 20px rgba(0,0,0,0.2)"
      : "none";
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>AlmaMatter</h1>
        <div style={buttonsWrapper}>
          <a
            href="/signup"
            style={buttonStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Sign Up
          </a>
          <a
            href="/login"
            style={buttonStyle}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}
