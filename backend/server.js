// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const db =require('./db');


const app = express();
app.use(cors()); // allow frontend requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional, for form data


// Load JSON data (must be pure JSON array, NOT JS variable)
const alumniData = JSON.parse(fs.readFileSync("./alumni_geocoded.json", "utf8"));

app.get("/api/alumni", (req, res) => {
  res.json(alumniData);
});

const alumniRoutes = require("./routes/alumniRoutes");
app.use('/api/old', alumniRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use('/api/admin', adminRoutes);

const studentRoutes = require("./routes/studentRoutes");
app.use('/api/student', studentRoutes);

const clubRoutes = require("./routes/clubRoutes");
app.use("/api/club", clubRoutes);

const recruiterRoutes = require("./routes/recruiterRoutes");
app.use('/api/recruiter', recruiterRoutes);

const teacherRoutes = require("./routes/facultyRoutes");
app.use('/api/teacher', teacherRoutes);

const { router: generalRoutes } = require("./routes/generalRoutes");
app.use("/api", generalRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
