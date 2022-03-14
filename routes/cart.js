const router = require("express").Router();
const {
  getCart,
  addItem,
  changeItemAmount,
} = require("../controllers/cartControl");

router.get("/:uid", async (req, res) => {
  const cartItems = await getCart(req.params.uid);
  if (cartItems) {
    // setTimeout(() => res.status(200).send({ cartItems }), 3000);
    res.status(200).send({ cartItems });
  } else {
    res.sendStatus(404);
  }
});

router.post("/", async (req, res) => {
  const { userInfo, id, amount } = req.body;
  const addAmount = await addItem(userInfo.uid, id, amount);
  // setTimeout(() => res.status(200).send({ addAmount }), 3000);
  res.status(200).send({ addAmount });
});

router.put("/", async (req, res) => {
  const { userInfo, id, amount } = req.body;
  const changeAmount = await changeItemAmount(userInfo.uid, id, amount);
  // setTimeout(() => res.status(200).send({ changeAmount }), 3000);
  res.status(200).send({ changeAmount });
});

module.exports = router;
