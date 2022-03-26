const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Nguyen Van A",
    email: "nguyenvana@gmail.com",
    password: bcrypt.hashSync("1234", 2),
    isAdmin: true,
  },
  {
    name: "Tran Van B",
    email: "tranvanb@gmail.com",
    password: bcrypt.hashSync("1235", 2),
    isAdmin: false,
  },
  {
    name: "Le Thi C",
    email: "lethic@gmail.com",
    password: bcrypt.hashSync("1236", 2),
    isAdmin: false,
  },
];

module.exports = users;
