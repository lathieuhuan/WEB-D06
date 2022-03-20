const router = require("express").Router();
const PostModel = require("../model/post.model");
const upload = require("../middleware/upload");

router.get("/new", (_, res) => {
  res.render("create");
});

router.post("/store", upload, (req, res) => {
  PostModel.create({ ...req.body }, (err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

module.exports = router;
