// backend/schema/post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  tag: {
    type: String,
    enum: ["career", "networking", "achievement", "opportunity", "general"],
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String },
  likes: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  userType: {
    type: String,
    enum: ["Alumni", "Recruiter", "Faculty", "College Administrator"],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
