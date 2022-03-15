const router = require("express").Router();
const { getUserByUsername } = require("../controllers/usersControl");
const { getCart } = require("../controllers/cartControl");

router.use("/form", (req, res, next) => {
  res.render("form");
});

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.post("/", async (req, res) => {
  const userInfo = await getUserByUsername(req.body.username);
  if (userInfo) {
    const cartItems = await getCart(userInfo.uid);
    res.status(200).send({ userInfo, cartItems: cartItems || [] });
  } else {
    res.sendStatus(404);
  }
});

router.post("/info", (req, res, next) => {
  const { body } = req;
  res.render("userInfo", { body });
});

module.exports = router;
