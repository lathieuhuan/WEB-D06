const router = require("express").Router();
const { getCart } = require("../controllers/cartControl");

router.post("/", async (req, res) => {
  const cartItems = await getCart(req.body.uid);
  res.render("checkout", { cartItems });
});

module.exports = router;
