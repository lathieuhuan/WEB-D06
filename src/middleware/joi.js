const joi = require("joi");

async function validateRegister(req, res, next) {
  try {
    const schema = joi.object({
      username: joi.string().min(4).required(),
      email: joi.string().email().required(),
      password: joi.string().min(4).required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return res
      .status(400)
      .send({ errors: err.details.map(({ message }) => message) });
  }
}

async function validateLogin(req, res, next) {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(4).required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return res
      .status(400)
      .send({ errors: err.details.map(({ message }) => message) });
  }
}

module.exports = { validateRegister, validateLogin };
