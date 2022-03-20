const bcrypt = require("bcryptjs");

function hash(password) {
  return bcrypt.hash(password, 2);
}

module.exports = { hash };
