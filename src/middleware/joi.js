const Joi = require("joi");
const { badRequest } = require("../utils/errorMaker");

const joiName = Joi.string().min(4).max(12);
const joiEmail = Joi.string().email();
const joiPwd = Joi.string().min(4).max(16);

const validateUserRegister = async (req, res, next) => {
  const schema = Joi.object({
    name: joiName.required(),
    email: joiEmail.required(),
    password: joiPwd.required(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return badRequest(res, err);
  }
};

const validateUserLogin = async (req, res, next) => {
  const schema = Joi.object({
    email: joiEmail.required(),
    password: joiPwd.required(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    console.log(err);
    return badRequest(res, err);
  }
};

const validateUserUpdate = async (req, res, next) => {
  const { newName, newEmail, newPassword } = req.body;
  const schema = Joi.object({
    newName: joiName,
    newEmail: joiEmail,
    newPassword: joiPwd,
  }).min(1);
  try {
    await schema.validateAsync({ newName, newEmail, newPassword });
    return next();
  } catch (err) {
    return badRequest(res, err);
  }
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
  validateUserUpdate,
};
