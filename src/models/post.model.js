const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: new Date(),
  },
  image: String,
  // image: {
  //   name: String,
  //   contentType: String,
  //   data: Buffer,
  // },
});

module.exports = mongoose.model("posts", PostSchema);
