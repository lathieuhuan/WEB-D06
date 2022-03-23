const jwt = require("../utils/jsonwebtoken");

async function checkToken(req, res, next) {
  try {
    const { username, _id } = await jwt.verify(req.body.token);
    req.body.username = username;
    req.body.uid = _id;
    next();
  } catch (err) {
    res.status(401).send({ errors: ["Unauthorized."] });
  }
}

module.exports = { checkToken };
