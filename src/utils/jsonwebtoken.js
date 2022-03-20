const jwt = require("jsonwebtoken");

function generate(info, expiresIn) {
  return new Promise((res) => {
    jwt.sign(info, "yek", { expiresIn }, (err, token) => {
      if (err) {
        console.log(err);
        res(undefined);
      }
      res(token);
    });
  });
}

module.exports = { generate };
