const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["voter", "admin"],
      default: "voter",
    },
    isAdmin:{
      type: Boolean,
      default: false,
    },
    hasVoted: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
      min: 1,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    resetPasswordToken: String,
  resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
