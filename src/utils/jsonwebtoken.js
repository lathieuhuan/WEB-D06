const jwt = require("jsonwebtoken");
const secretKey = "yeKterces";

function generate(info, expiresIn = "7d") {
  return new Promise((res, rej) => {
    jwt.sign(info, secretKey, { expiresIn }, (err, token) => {
      if (err) rej(err);
      res(token);
    });
  });
}

function verify(token) {
  return new Promise((res, rej) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) rej(err);
      else res(decoded);
    });
  });
}

module.exports = { generate, verify };
