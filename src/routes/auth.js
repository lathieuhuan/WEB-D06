const router = require("express").Router();
const jwt = require("../utils/jsonwebtoken");

router.get("/register", (_, res) => {
  res.render("register");
});

router.get("/login", (_, res) => {
  res.render("login");
});

router.post("/check-token", async (req, res) => {
  try {
    const { username } = await jwt.verify(req.body.token);
    // refresh token?
    res.send({ username });
  } catch (err) {
    res.sendStatus(401);
  }
});

module.exports = router;
