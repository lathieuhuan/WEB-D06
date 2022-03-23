const router = require("express").Router();
const UserModel = require("../models/user.model");
const { validateRegister, validateLogin } = require("../middleware/joi");
const { checkToken } = require("../middleware/token");
const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jsonwebtoken");

router.get("/", async (_, res) => {
  const users = await UserModel.find({});
  return res.render("users", {
    users: users.map(({ _id, username, email }) => ({ _id, username, email })),
  });
});

router.get("/profile/:username", async (req, res) => {
  const user = await UserModel.findOne({ username: req.params.username });
  console.log(user);
  if (user) {
    return res.send(`Day la profile cua ${user.username} (uid: ${user._id})`);
  }
  return res.sendStatus(404);
});

router.post("/search/:_id", checkToken, async (req, res) => {
  const { _id } = req.params;
  const user = await UserModel.findOne({ _id });
  if (!user) return res.status(404).send({ errors: ["User not found."] });
  res.send({
    _id: user._id,
    username: user.username,
    email: user.email,
    isOwner: req.body.uid === _id,
  });
});

router.post("/new", validateRegister, async (req, res) => {
  const { username, email, password } = req.body;
  const existedUser = await UserModel.findOne({ email });
  if (existedUser) {
    return res.status(400).send({ errors: ["Email da duoc su dung."] });
  }
  const userInfo = { username, email, password };
  try {
    const user = await UserModel.create(userInfo);
    const token = await jwt.generate({ username, _id: user._id });
    res.send({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/login", validateLogin, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw 404;
    const rightPwd = await bcrypt.compare(password, user.password);
    if (!rightPwd) throw 401;
    const token = await jwt.generate({
      username: user.username,
      _id: user._id,
    });
    res.send({ token });
  } catch (err) {
    if (err === 401) {
      return res.status(err).send({ errors: ["Sai mat khau."] });
    } else if (err === 404) {
      return res.status(err).send({ errors: ["Tai khoan khong ton tai."] });
    }
    return res.status(500).send({ errors: [`Loi he thong. ${err.message}`] });
  }
});

module.exports = router;
