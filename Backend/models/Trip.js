const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "submitted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const TripSchema = new mongoose.Schema(
  {
    tripCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["collecting", "ready", "processing", "completed", "failed"],
      default: "collecting",
    },

    recommendationGenerated: {
      type: Boolean,
      default: false,
    },

    members: [MemberSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", TripSchema);