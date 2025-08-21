import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  name: String,
  phone: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Record", recordSchema);
