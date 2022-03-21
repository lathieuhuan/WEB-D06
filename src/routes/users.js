const router = require("express").Router();
const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jsonwebtoken");
const UserModel = require("../models/user.model");

router.get("/:username", async (req, res) => {
  const user = await UserModel.findOne({ username: req.params.username });
  if (!user) res.sendStatus(404);
  else {
    res.send("Day la trang profile cua " + user.username);
  }
});

router.post("/new", async (req, res) => {
  const { username, email, password } = req.body;
  const userInfo = {
    username,
    email,
    password: await bcrypt.hash(password),
  };
  try {
    const token = await jwt.generate({ username });
    UserModel.create(userInfo, (err) => {
      if (err) throw err;
      else {
        res.send({ token });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw 404;
    const rightPwd = await bcrypt.compare(password, user.password);
    if (!rightPwd) throw 401;
    const token = await jwt.generate({ username: user.username });
    res.send({ token });
  } catch (err) {
    if (err === 401 || err === 404) {
      res.sendStatus(err);
    } else {
      console.log(err);
      res.sendStatus(500);
    }
  }
});

module.exports = router;
