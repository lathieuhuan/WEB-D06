const UserModel = require("../models/user.model");
const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const existedUser = await UserModel.findOne({ email });
  if (existedUser) {
    return next({ code: 400, msg: "Email da dc su dung." });
  }
  const userInfo = { name, email, password };
  try {
    const user = await UserModel.create(userInfo);
    const token = await jwt.generate({ _id: user._id, name });
    res.send({ token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existedUser = await UserModel.findOne({ email });
    if (!existedUser) {
      return next({ code: 400, msg: "Tai khoan khong ton tai." });
    }
    const pwdCorrect = await bcrypt.compare(password, existedUser.password);
    if (!pwdCorrect) {
      return next({ code: 401, msg: "Sai mat khau." });
    }
    const token = await jwt.generate({
      _id: existedUser._id,
      name: existedUser.name,
    });
    res.send({ name: existedUser.name, token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(res.locals._id);
    if (!user) {
      return next({ code: 404 });
    }
    const { _id, name, email, isAdmin } = user;
    res.send({ _id, name, email, isAdmin });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const reqInfo = await getUpdateReqInfo(req.body);
    const newInfo = await UserModel.findOneAndUpdate(
      { _id: res.locals._id },
      { ...reqInfo },
      { returnOriginal: false }
    );
    if (!newInfo) {
      return next({ code: 404 });
    }
    const { password, ...resInfo } = newInfo._doc;
    res.send({ resInfo });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params._id);
    if (!user) {
      return next({ code: 404 });
    }
    res.send({ msg: `Da xoa nguoi dung ${user.name}.` });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params._id);
    if (!user) {
      return next({ code: 404 });
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const reqInfo = await getUpdateReqInfo(req.body);
    const newInfo = await UserModel.findOneAndUpdate(
      { _id: req.params._id },
      { ...reqInfo },
      { returnOriginal: false }
    );
    if (!newInfo) {
      return next({ code: 404 });
    }
    const { password, ...resInfo } = newInfo._doc;
    res.send({ resInfo });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getProfile,
  updateProfile,
  deleteUser,
  getUserById,
  updateUserById,
};

async function getUpdateReqInfo(reqBody) {
  const result = {};
  for (const field of ["name", "email", "password"]) {
    if (reqBody[field]) {
      result[field] = reqBody[field];
    }
  }
  if (result.password) {
    result.password = await bcrypt.hash(result.password);
  }
  return result;
}
