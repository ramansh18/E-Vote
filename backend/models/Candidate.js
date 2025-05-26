const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true },
    walletAddress: { type: String, default: null }, 
    party: { type: String, required: true },
    txHash: { type: String }, // Store Blockchain Transaction Hash
    status: { type: String, enum: ["pending", "approved"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Candidate", candidateSchema);
