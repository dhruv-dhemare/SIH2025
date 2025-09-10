const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true },
    phn: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    headline: { type: String },
    about: { type: String },
    experience: { type: [String], default: [] },
    education: { type: [String], default: [] },
    certification: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    urls: { type: [String], default: [] },
    resume: { type: String },
    locations: { type: [String], default: [] },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

studentSchema.methods.comparePassword = async function (pw) {
  return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
