// geocode_pincodes.js
const fs = require("fs");
const fetch = require("node-fetch"); // install with: npm install node-fetch@2

// Load alumni data with names, pincodes, and country
let alumni = JSON.parse(fs.readFileSync("alumni_pincode.json", "utf8"));

// Helper: delay requests (Nominatim requires it)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function geocodePincodes() {
  let results = [];

  for (let i = 0; i < alumni.length; i++) {
    let person = alumni[i];
    // Use q instead of postalcode
    let query = `${person.pincode}, ${person.country}`;
    let url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

    console.log(`🔍 Geocoding ${person.name} (${query})`);

    try {
      let res = await fetch(url, {
        headers: { "User-Agent": "AlumniMap/1.0 (student project)" }
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      let data = await res.json();

      if (data.length > 0) {
        person.lat = parseFloat(data[0].lat);
        person.lng = parseFloat(data[0].lon);
        person.display_name = data[0].display_name;
        console.log(`✅ Found: ${person.lat}, ${person.lng}`);
      } else {
        person.lat = null;
        person.lng = null;
        person.display_name = null;
        console.log(`❌ Not found`);
      }
    } catch (err) {
      person.lat = null;
      person.lng = null;
      person.error = err.message;
      console.log(`⚠️ Error: ${err.message}`);
    }

    results.push(person);

    // Sleep 1 sec between requests (important for Nominatim)
    await sleep(1000);
  }

  // Save full detailed output
  fs.writeFileSync("alumni_geocoded.json", JSON.stringify(results, null, 2));
  console.log("📂 Saved -> alumni_geocoded.json");

  // Save simplified dataset for map plotting
  let mapData = results
    .filter(p => p.lat && p.lng) // only valid
    .map(p => ({
      name: p.name,
      pincode: p.pincode,
      lat: p.lat,
      lng: p.lng
    }));

  fs.writeFileSync("alumniData.js", "var alumniData = " + JSON.stringify(mapData, null, 2) + ";");
  console.log("📂 Saved -> alumniData.js (for map.html)");
}

geocodePincodes();
