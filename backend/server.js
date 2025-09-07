const express = require("express");
const cors = require("cors");
const alumniData = require("./alumni_geocoded.json");

const app = express();
app.use(cors()); // allow frontend requests

app.get("/api/alumni", (req, res) => {
  res.json(alumniData);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
