const router = require("express").Router();
const ctrl = require("../controllers/user.controller");
const validate = require("../middleware/validator");
const { checkToken, checkAdmin } = require("../middleware/auth");

router.post("/", validate.validateUserRegister, ctrl.register);

router.post("/login", validate.validateUserLogin, ctrl.login);

// admin gets all users
router.get("/", checkToken, checkAdmin, ctrl.getAllUsers);

// user gets profile
router.get("/profile", checkToken, ctrl.getProfile);

// user updates profile
router.put(
  "/profile",
  checkToken,
  validate.validateUserUpdate,
  ctrl.updateProfile
);

router.delete("/:_id", checkToken, checkAdmin, ctrl.deleteUser);

// admin gets profile by user id
router.get("/:_id", checkToken, checkAdmin, ctrl.getUserById);

// admin updates profile by user id
router.put(
  "/:_id",
  checkToken,
  checkAdmin,
  validate.validateUserUpdate,
  ctrl.updateUserById
);

module.exports = router;
