import React from "react";
import { FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import "./ContactCard.css"; // Import CSS

const ContactCard = ({ name, image, phone, email, linkedin }) => {
  return (
    <div className="contact-card">
      <center>
        {/* Profile Image */}
        <img src={image} alt={name} className="contact-img" />

        {/* Name */}
        <h2 className="creator-name">{name}</h2>

        {/* Divider Line */}
        <hr className="divider" />

        {/* Phone */}
        <div className="info-row">
          <FaPhone className="icon phone-icon" />
          <p className="info-text">{phone}</p>
        </div>

        {/* Email */}
        <div className="info-row">
          <FaEnvelope className="icon email-icon" />
          <p className="info-text">{email}</p>
        </div>

        {/* LinkedIn */}
        <div className="info-row">
          <FaLinkedin className="icon linkedin-icon" />
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="info-link"
          >
            LinkedIn
          </a>
        </div>
      </center>
    </div>
  );
};

export default ContactCard;
