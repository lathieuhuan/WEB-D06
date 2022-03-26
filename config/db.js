const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost/e-commerce");
    console.log(`MongoDB connected at ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
