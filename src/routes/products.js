const router = require("express").Router();
const ctrl = require("../controllers/product.controller");
const validate = require("../middleware/validator");
const { checkToken, checkAdmin } = require("../middleware/auth");

router.get("/", ctrl.getProducts);

router.post("/", checkToken, checkAdmin, ctrl.createProduct);

router.get("/top", ctrl.getTopProducts);

router.post("/:id/reviews", checkToken, ctrl.createReview);

router.get("/:id", ctrl.getProductById);

router.delete("/:id", checkToken, checkAdmin, ctrl.deleteProductById);

router.put("/:id", checkToken, checkAdmin, ctrl.updateProductById);

module.exports = router;
