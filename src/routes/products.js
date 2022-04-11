const router = require("express").Router();
const ctrl = require("../controllers/product.controller");
const validate = require("../middleware/validator");
const { checkToken, checkAdmin } = require("../middleware/auth");

router.get("/", ctrl.getProducts);

router.post("/", checkToken, checkAdmin, ctrl.createProduct);

router.post("/:id/reviews", checkToken, ctrl.createReview);

module.exports = router;
