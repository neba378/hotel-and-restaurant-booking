const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
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
  role: {
    type: String,
    enum: ["customer", "vendor", "admin"],
    default: "customer",
  },
  contactDetails: {
    phone: String,
    address: String,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
