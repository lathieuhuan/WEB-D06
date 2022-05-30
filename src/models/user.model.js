const mongoose = require("mongoose");
const bcrypt = require("../utils/bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password);
  next();
});

module.exports = mongoose.model("users", userSchema);
