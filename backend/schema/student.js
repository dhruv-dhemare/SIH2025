const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true }, // auto-generated, not required
    phone: { type: String },                  // clearer name
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    headline: String,
    about: String,
    experience: { type: [String], default: [] },
    education: { type: [String], default: [] },
    certification: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    urls: { type: [String], default: [] },
    resume: String,
    locations: { type: [String], default: [] },

    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

// Hash password before save
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10); // or 12
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
studentSchema.methods.comparePassword = async function (pw) {
  return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
