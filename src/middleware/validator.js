const Joi = require("joi");

const joiName = Joi.string().min(4).max(16);
const joiEmail = Joi.string().email();
const joiPwd = Joi.string().min(4).max(22);

const validateUserRegister = async (req, res, next) => {
  const schema = Joi.object({
    name: joiName.required(),
    email: joiEmail.required(),
    password: joiPwd.required(),
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const validateUserLogin = async (req, res, next) => {
  const schema = Joi.object({
    email: joiEmail.required(),
    password: joiPwd.required(),
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const validateUserUpdate = async (req, res, next) => {
  const schema = Joi.object({
    name: joiName,
    email: joiEmail,
    password: joiPwd,
  }).min(1);
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const validateGetUserById = async (req, res, next) => {
  try {
    await Joi.object({ _id: Joi.string().required() }).validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateUserRegister,
  validateUserLogin,
  validateUserUpdate,
  validateGetUserById,
};
