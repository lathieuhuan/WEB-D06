const Joi = require("joi");

const userLoginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(16).required(),
};

const validateUserRegister = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(12).required(),
    ...userLoginSchema,
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return res.status(400).send({
      errors: err.details.map(({ message }) => message),
    });
  }
};

const validateUserLogin = async (req, res, next) => {
  try {
    await Joi.object(userLoginSchema).validateAsync(req.body);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      errors: err.details.map(({ message }) => message),
    });
  }
};

module.exports = { validateUserRegister, validateUserLogin };
