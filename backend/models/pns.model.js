const mongoose = require("mongoose");

const pnsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["product", "service"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PNS", pnsSchema);
