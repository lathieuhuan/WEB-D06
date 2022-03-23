const router = require("express").Router();
const PostModel = require("../models/post.model");
const upload = require("../middleware/upload");
const { checkToken } = require("../middleware/token");

router.get("/new", (_, res) => {
  res.render("create");
});

router.post("/store", checkToken, upload, async (req, res) => {
  const { username, title, body, image } = req.body;
  try {
    const post = { author: username, title, body, image };
    PostModel.create(post, (err) => {
      if (err) console.log(err);
      res.redirect("/");
    });
  } catch (err) {
    res.sendStatus(401);
  }
});

module.exports = router;
