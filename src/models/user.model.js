const mongoose = require("mongoose");
const bcrypt = require("../utils/bcrypt");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password);
  next();
});

module.exports = mongoose.model("users", UserSchema);
