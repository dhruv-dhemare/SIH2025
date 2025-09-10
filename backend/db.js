const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL_LOCAL;

if (!mongoURL) {
    console.error("❌ MongoDB URL not found in environment variables.");
    process.exit(1);
}

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ Connection established with the Database");
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("🔗 Mongoose connected to MongoDB");
});

db.on('disconnected', () => {
    console.log("⚠️ Mongoose disconnected from MongoDB");
});

db.on('error', (err) => {
    console.error("💥 Mongoose connection error:", err);
});

module.exports = db;
