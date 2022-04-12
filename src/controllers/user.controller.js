const UserModel = require("../models/user.model");
const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");

const projection = "name email isAdmin";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const existedUser = await UserModel.findOne({ email }).lean();
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
    const existedUser = await UserModel.findOne({ email }).lean();
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
    const users = await UserModel.find(null, projection).lean();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(res.locals._id, projection).lean();
    if (!user) {
      return next({ code: 404 });
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password);
    }
    const resInfo = await UserModel.findByIdAndUpdate(
      res.locals._id,
      { ...req.body },
      { new: true, lean: true, projection }
    );
    if (!resInfo) {
      return next({ code: 404 });
    }
    res.send(resInfo);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params._id).lean();
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
    const user = await UserModel.findById(req.params._id, projection).lean();
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
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password);
    }
    const resInfo = await UserModel.findByIdAndUpdate(
      req.params._id,
      { ...req.body },
      { new: true, lean: true, projection }
    );
    if (!resInfo) {
      return next({ code: 404 });
    }
    res.send(resInfo);
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
