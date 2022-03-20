const router = require("express").Router();

router.get("/register", (_, res) => {
  res.render("register");
});

module.exports = router;
