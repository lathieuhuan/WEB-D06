var router = require("express").Router();

router.get("/", function (req, res, next) {
  res.send("admin page");
});

module.exports = router;
