const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const recruiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true },
    phn: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    headline: { type: String },
    about: { type: String },
    urls: { type: [String], default: [] },
    posts: { type: [String], default: [] },
    locations: { type: [String], default: [] },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

// -------------------- Password hashing --------------------
recruiterSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// -------------------- Password comparison --------------------
recruiterSchema.methods.comparePassword = async function (pw) {
  return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('Recruiter', recruiterSchema);
