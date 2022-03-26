const connectDB = require("./config/db");
const users = require("./data/users");
const UserModel = require("./src/models/user.model");

connectDB();

(async function () {
  try {
    await UserModel.deleteMany();
    await UserModel.insertMany(users);
  } catch (err) {
    console.log(err);
  }
})();
