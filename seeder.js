const connectDB = require("./config/db");
const users = require("./data/users");
const products = require("./data/products");
const UserModel = require("./src/models/user.model");
const ProductModel = require("./src/models/product.model");

connectDB();

(async function () {
  try {
    // await UserModel.deleteMany();
    // await UserModel.insertMany(users);
    const admin = await UserModel.findOne({ isAdmin: true });
    const samples = products.map((product) => ({
      user: admin._id,
      ...product,
    }));
    await ProductModel.deleteMany();
    await ProductModel.insertMany(samples);
  } catch (err) {
    console.log(err);
  }
})();
