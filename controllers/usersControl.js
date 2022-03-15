const users = require("../data/users");

async function getUserByUsername(username) {
  return users.find((user) => user.username === username);
}

module.exports = { getUserByUsername };
