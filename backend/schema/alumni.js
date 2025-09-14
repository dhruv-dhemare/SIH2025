const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const alumniSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true },
    phn: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    headline: { type: String },
    about: { type: String },

    // Career & education
    experience: { type: [String], default: [] },
    education: { type: [String], default: [] },
    certification: { type: [String], default: [] },
    skills: { type: [String], default: [] },

    // Links and media
    urls: { type: [String], default: [] },
    resume: { type: String },                 // path or cloud URL
    profilePhoto: { type: String },           // NEW: optional profile image

    // Location & personal info
    address: { type: String },                // NEW
    city: { type: String },                   // NEW
    state: { type: String },                  // NEW
    country: { type: String },                // NEW
    dob: { type: Date },                      // NEW
    gender: { type: String, enum: ["Male", "Female", "Other"] }, // NEW

    // Platform activity
    posts: { type: [String], default: [] },
    locations: { type: [String], default: [] },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

// Hash password before save
alumniSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
alumniSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    console.error("Password comparison error:", err);
    return false;
  }
};

module.exports = mongoose.model("Alumni", alumniSchema);
