const bcrypt = require("bcryptjs");
const saltRounds = 2;

function hash(password) {
  return bcrypt.hash(password, saltRounds);
}

function compare(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = { hash, compare };
