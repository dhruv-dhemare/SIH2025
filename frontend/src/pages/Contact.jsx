import React from "react";
import ContactCard from "../components/ContactCard";
import "./Contact.css";

// ✅ Import all images first
import dhruvImg from "../assets/creator_dhruv.JPG";
import dishaImg from "../assets/creator_disha.JPG";
import apoorvImg from "../assets/creator_apoorv.JPG";
import gargiImg from "../assets/creator_gargi.JPG";
import shreyaImg from "../assets/creator_shreya.JPG";
import sharvariImg from "../assets/creator_sharvari.JPG";

const teamMembers = [
  {
    name: "Dhruv Dhemare",
    image: dhruvImg,
    phone: "7020961222",
    email: "dhruvdhemare@gmail.com",
    linkedin: "https://www.linkedin.com/in/dhruv-dhemare-43378728a/", 
  },
  {
    name: "Disha Bhelke",
    image: dishaImg,
    phone: "7507179098",
    email: "bhelked5@gmail.com",
    linkedin: "https://www.linkedin.com/in/disha-bhelke-054a56291/",
  },
  {
    name: "Apoorv Deshmukh",
    image: apoorvImg,
    phone: "9552910359",
    email: "theapoorvdeshmukh@gmail.com",
    linkedin: "https://www.linkedin.com/in/apoorv-deshmukh-b34824292/",
  },
  {
    name: "Gargi Kalekar",
    image: gargiImg,
    phone: "9028366787",
    email: "gargi.aarti11@gmail.com",
    linkedin: "https://www.linkedin.com/in/gargi-kalekar-a857b6300/",
  },
  {
    name: "Shreya Magar",
    image: shreyaImg,
    phone: "7499748334",
    email: "shreyamagar1602@gmail.com",
    linkedin: "https://www.linkedin.com/in/shreya-magar/",
  },
  {
    name: "Sharvari Jamkar",
    image: sharvariImg,
    phone: "9130127246",
    email: "sharvarijamkar14@gmail.com",
    linkedin: "https://www.linkedin.com/in/sharvari-jamkar/",
  },
];

const Contact = () => {
  return (
    <div className="contact-page">
      <h1 className="page-title">Our Creators</h1>
      <hr
        className="divider-contact"
        style={{
          margin: "0px",
          padding: "0px",
          border: "none",           // remove default border
          height: "2px",            // thickness of the line
          backgroundColor: "#045233" // your green color
        }}
      />

      <div className="cards-grid">
        {teamMembers.map((member, index) => (
          <ContactCard
            key={index}
            name={member.name}
            image={member.image}
            phone={member.phone}
            email={member.email}
            linkedin={member.linkedin}
          />
        ))}
      </div>
    </div>
  );
};

export default Contact;
