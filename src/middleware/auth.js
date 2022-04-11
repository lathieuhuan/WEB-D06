const UserModel = require("../models/user.model");
const jwt = require("../utils/jwt");

const checkToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization?.startsWith("Bearer")) {
      const { _id, name } = await jwt.verify(authorization.slice(7));
      res.locals._id = _id;
      res.locals.name = name;
      return next();
    }
    throw new Error("");
  } catch (error) {
    next({ code: 401 });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const { isAdmin } = await UserModel.findById(res.locals._id);
    if (isAdmin) {
      return next();
    }
    next({ code: 401 });
  } catch (error) {
    next({ code: 404, msg: "Tai khoan admin khong ton tai." });
  }
};

module.exports = { checkToken, checkAdmin };
