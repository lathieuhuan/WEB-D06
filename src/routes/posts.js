const router = require("express").Router();
const PostModel = require("../models/post.model");
const upload = require("../middleware/upload");
const jwt = require("../utils/jsonwebtoken");

router.get("/new", (_, res) => {
  res.render("create");
});

router.post("/store", upload, async (req, res) => {
  const { token, ...rest } = req.body;
  try {
    const { username } = await jwt.verify(token);
    PostModel.create({ author: username, ...rest }, (err) => {
      if (err) console.log(err);
      res.redirect("/");
    });
  } catch (err) {
    res.sendStatus(401);
  }
});

module.exports = router;
