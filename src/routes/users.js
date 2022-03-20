const router = require("express").Router();
const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jsonwebtoken");
const UserModel = require("../models/user.model");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const userInfo = {
    username,
    email,
    password: await bcrypt.hash(password),
  };
  const token = await jwt.generate({ username }, 10);
  if (token) {
    UserModel.create(userInfo, (err) => {
      if (err) res.sendStatus(500);
      else res.send({ token });
    });
  } else res.sendStatus(500);
});

module.exports = router;
