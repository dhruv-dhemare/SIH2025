// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const db =require('./db');

const app = express();
app.use(cors()); // allow frontend requests

// Load JSON data (must be pure JSON array, NOT JS variable)
const alumniData = JSON.parse(fs.readFileSync("./alumni_geocoded.json", "utf8"));
const userRoutes = require('./routes/userRoutes');

app.get("/api/alumni", (req, res) => {
  res.json(alumniData);
});
app.use('/api/user', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
