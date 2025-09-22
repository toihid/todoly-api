const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    tags: [{ type: String }],
    date: { type: String, required: true },
    start_time: { type: String },
    end_time: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
