const router = require("express").Router();
const postsRouter = require("./posts");
const usersRouter = require("./users");
const authRouter = require("./auth");
const PostModel = require("../models/post.model");

router.get("/", (_, res) => {
  PostModel.find({}, (err, posts) => {
    if (err) return res.sendStatus(500);
    else {
      res.render("index", { posts });
    }
  });
});

router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
