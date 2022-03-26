const jwt = require("../utils/jwt");

const checkToken = async (req, res, next) => {
  try {
    const { name, _id } = await jwt.verify(req.headers.token);
    req.body.name = name;
    req.body._id = _id;
    return next();
  } catch (err) {
    return res.status(401).send({ errors: [`Invalid token.`] });
  }
};

module.exports = { checkToken };
