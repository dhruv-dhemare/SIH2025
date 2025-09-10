// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const db =require('./db');

const app = express();
app.use(cors()); // allow frontend requests
app.use(express.json());

// Load JSON data (must be pure JSON array, NOT JS variable)
const alumniData = JSON.parse(fs.readFileSync("./alumni_geocoded.json", "utf8"));
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.get("/api/alumni", (req, res) => {
  res.json(alumniData);
});
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
