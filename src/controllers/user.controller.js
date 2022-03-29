const UserModel = require("../models/user.model");
const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");
const { systemError } = require("../utils/errorMaker");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existedUser = await UserModel.findOne({ email });
  if (existedUser) {
    return res.status(400).send({ errors: ["Email da duoc su dung."] });
  }
  const userInfo = { name, email, password };
  try {
    const user = await UserModel.create(userInfo);
    const token = await jwt.generate({ name, _id: user._id });
    return res.send({ token });
  } catch (err) {
    console.log(err);
    return systemError(res);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existedUser = await UserModel.findOne({ email });
    if (!existedUser) {
      throw 404;
    }
    const pwdCorrect = await bcrypt.compare(password, existedUser.password);
    if (!pwdCorrect) {
      throw 401;
    }
    const token = await jwt.generate({
      name: existedUser.name,
      _id: existedUser._id,
    });
    return res.send({ token });
  } catch (err) {
    if (err === 401) {
      return res.status(err).send({ errors: [`Sai mat khau.`] });
    } else if (err === 404) {
      return res.status(err).send({ errors: [`Tai khoan khong ton tai.`] });
    }
    console.log(err);
    return systemError(res);
  }
};

const getProfile = async (req, res) => {
  try {
    const { name, email, _id } = await UserModel.findById(req.body._id);
    res.send({ name, email, _id });
  } catch (err) {
    console.log(err);
    return systemError(res);
  }
};

const updateProfile = async (req, res) => {
  const reqInfo = {};
  for (const type of ["newName", "newEmail", "newPassword"]) {
    if (req.body[type]) {
      reqInfo[type.slice(3).toLowerCase()] = req.body[type];
    }
  }
  if (reqInfo.password) {
    reqInfo.password = await bcrypt.hash(reqInfo.password);
  }
  const newInfo = await UserModel.findOneAndUpdate(
    { _id: req.body._id },
    { ...reqInfo },
    { returnOriginal: false }
  );
  const { password, ...resInfo } = newInfo._doc;
  return res.send({ resInfo });
};

module.exports = { register, login, getProfile, updateProfile };
