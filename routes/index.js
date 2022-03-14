var router = require("express").Router();
var products = require("../data/products");

router.get("/", function (_, res) {
  res.render("index", { products });
});

module.exports = router;
