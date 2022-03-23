const router = require("express").Router();
const { checkToken } = require("../middleware/token");

router.get("/register", (_, res) => {
  res.render("register");
});

router.get("/login", (_, res) => {
  res.render("login");
});

router.post("/check-token", checkToken, (req, res) => {
  res.send({ username: req.body.username });
});

module.exports = router;
