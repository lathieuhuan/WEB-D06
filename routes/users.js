var router = require("express").Router();

router.use("/form", (req, res, next) => {
  res.render("form");
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/info", (req, res, next) => {
  const { body } = req;
  res.render("userInfo", { body });
});

module.exports = router;
