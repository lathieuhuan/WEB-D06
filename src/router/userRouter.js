const { body, validationResult, check } = require("express-validator");
const User = require("../models/userModel");
const router = require("express").Router();
const { userErrorMsg, errorsValidatingUser } = require("../utils/createErrors");

// 1. Lay danh sach users
router.get("/", (_, res) => {
  res.send(User.users);
});

// 2. Lay thong tin user theo id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const existedUser = User.findUserById(id);
  if (existedUser) {
    res.send(existedUser);
  } else {
    return res.status(404).send({ errors: [`${userErrorMsg[3]} ${id}.`] });
  }
});

// 3. Them user
router.post(
  "/",
  [
    check("name", userErrorMsg[0]).exists({ checkFalsy: true }),
    check("email", userErrorMsg[0]).exists({ checkFalsy: true }),
    check("age", userErrorMsg[0]).exists(),
    check("gender", userErrorMsg[0]).exists(),
  ],
  body("email")
    .isEmail()
    .bail()
    .custom((value) => {
      if (User.findUserByEmail(value)) {
        throw new Error(userErrorMsg[1]);
      }
      return true;
    }),
  body("age").isInt({ min: 1, max: 200 }),
  body("gender").isInt({ min: 0, max: 2 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errorsValidatingUser(errors),
      });
    }
    User.addUser(req.body);
    res.send(User.users);
  }
);

// 4. Cap nhat ten user theo id
router.put(
  "/",
  [
    check("id", userErrorMsg[0]).exists({ checkFalsy: true }),
    check("name", userErrorMsg[0]).exists({ checkFalsy: true }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errorsValidatingUser(errors),
      });
    }
    const { id, name } = req.body;
    const existedUser = User.findUserById(id);
    if (existedUser) {
      existedUser.name = name;
      res.send(existedUser);
    } else {
      return res.status(404).send({ errors: [`${userErrorMsg[3]} ${id}.`] });
    }
  }
);

// 5. Xoa user
router.delete(
  "/",
  check("id", userErrorMsg[0]).exists({ checkFalsy: true }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errorsValidatingUser(errors),
      });
    }
    const { id } = req.body;
    try {
      User.removeUser(id);
      return res.status(200).send({ msg: `Da xoa nguoi dung voi id ${id}.` });
    } catch ({ message }) {
      if (message === "Khong ton tai.") {
        return res.status(404).send({ errors: [`${userErrorMsg[3]} ${id}.`] });
      }
      return res.status(500).send({ errors: [message] });
    }
  }
);

module.exports = router;
