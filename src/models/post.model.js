const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: String,
  title: String,
  body: String,
  username: String,
  datePosted: {
    type: Date,
    default: new Date(),
  },
  image: {
    name: String,
    contentType: String,
    data: Buffer,
  },
});

module.exports = mongoose.model("posts", PostSchema);
