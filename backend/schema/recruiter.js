const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const recruiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true },
    phn: {
      type: String,
      validate: {
        validator: v => /^[0-9]{10}$/.test(v),
        message: props => `${props.value} is not a valid 10-digit phone number`
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    password: { type: String, required: true },
    headline: { type: String },
    about: { type: String },
    urls: { type: [String], default: [] },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    locations: { type: [String], default: [] },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
  },
  { timestamps: true }
);

// Hash password before saving
recruiterSchema.pre("save", async function (next) {
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
recruiterSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    console.error("Password comparison error:", err);
    return false;
  }
};

module.exports = mongoose.model("Recruiter", recruiterSchema);
