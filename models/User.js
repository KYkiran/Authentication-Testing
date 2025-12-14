// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// hash password before save
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next && typeof next === "function" ? next() : undefined;
    }

    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);

    return next && typeof next === "function" ? next() : undefined;
  } catch (err) {
    return next && typeof next === "function" ? next(err) : undefined;
  }
});

// helper to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
