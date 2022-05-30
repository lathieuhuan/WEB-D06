const router = require("express").Router();
const ctrl = require("../controllers/product.controller");
const { checkToken, checkAdmin } = require("../middleware/auth");

router.get("/", ctrl.getProductsForHome);

router.get("/category/:category", ctrl.getProductsForCategory);

router.post("/", checkToken, checkAdmin, ctrl.createProduct);

router.get("/top", ctrl.getTopProducts);

router.post("/:id/reviews", checkToken, ctrl.createReview);

router.get("/:id", ctrl.getProductById);

router.delete("/:id", checkToken, checkAdmin, ctrl.deleteProductById);

router.put("/:id", checkToken, checkAdmin, ctrl.updateProductById);

module.exports = router;
