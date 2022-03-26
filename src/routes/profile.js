const router = require("express").Router();
const UserModel = require("../models/user.model");

router.get("/:_id", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params._id });
  if (user) {
    return res.send(`Day la profile cua ${user.username} (uid: ${user._id})`);
  }
  return res.sendStatus(404);
});

module.exports = router;
