const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  facilities: {
    type: [String],
    default: [],
  },
  pricing: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  type: {
    type: String,
    enum: ["hotel", "restaurant"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Listing", listingSchema);
