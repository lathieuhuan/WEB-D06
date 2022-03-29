const router = require("express").Router();
const ctrl = require("../controllers/user.controller");
const validate = require("../middleware/joi");
const { checkToken } = require("../middleware/token");

router.post("/", validate.validateUserRegister, ctrl.register);

router.post("/login", validate.validateUserLogin, ctrl.login);

router.get("/profile", checkToken, ctrl.getProfile);

router.put(
  "/profile",
  checkToken,
  validate.validateUserUpdate,
  ctrl.updateProfile
);

module.exports = router;
