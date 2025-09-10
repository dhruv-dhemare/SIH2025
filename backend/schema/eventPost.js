const mongoose = require("mongoose");

const eventPostSchema = new mongoose.Schema({
  tag: {
    type: String,
    enum: ["seminar", "workshop", "cultural", "sports", "reunion", "fundraising"],
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String }, // URL or file path
  likes: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  userType: {
    type: String,
    enum: ["Club", "College Administrator"],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EventPost", eventPostSchema);
