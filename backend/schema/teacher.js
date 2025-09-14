const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, unique: true, trim: true },

    phone: {
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
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },

    password: { type: String, required: true },

    headline: { type: String, trim: true },
    about: { type: String, trim: true },

    experience: { type: [String], default: [] },
    education: { type: [String], default: [] },
    certification: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    urls: { type: [String], default: [] },
    resume: { type: String, trim: true },
    posts: { type: [String], default: [] },
    locations: { type: [String], default: [] },

    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
  },
  { timestamps: true }
);

// Hash password before save
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Secure password comparison
teacherSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    console.error("Password comparison error:", err);
    return false;
  }
};

module.exports = mongoose.model("Teacher", teacherSchema);
