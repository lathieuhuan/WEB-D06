const router = require("express").Router();
const PostModel = require("../model/post.model");

router.get("/", (_, res) => {
  PostModel.find({}, (err, posts) => {
    if (err) res.sendStatus(500);
    res.render("index", { posts });
  });
});

module.exports = router;
