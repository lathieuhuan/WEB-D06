const carts = require("../data/carts");
var products = require("../data/products");

function getCartByUid(uid) {
  return carts.find((cart) => cart.uid === uid);
}

function getProductById(id) {
  // co the loi: ko tim thay product
  return products.find((item) => item.id === id);
}

async function getCart(uid) {
  const cart = getCartByUid(uid);
  if (cart) {
    return cart.items.map((item) => {
      const { name, price } = getProductById(item.id);
      return { ...item, name, price };
    });
  }
  return null;
}

async function addItem(uid, itemId, amount) {
  let cartIndex = carts.findIndex((cart) => cart.uid === uid);
  if (cartIndex === -1) {
    carts.push({
      id: carts.length + 1,
      uid,
      createdOn: new Date(2022, 2, 13),
      items: [],
    });
    cartIndex = carts.length - 1;
  }
  carts[cartIndex].items.push({ id: itemId, amount });
  return amount * getProductById(itemId).price;
}

async function changeItemAmount(uid, itemId, amount) {
  const { items } = getCartByUid(uid);
  const itemIndex = items.findIndex((item) => item.id === itemId);
  const oldAmount = items[itemIndex].amount;
  if (amount) {
    items[itemIndex].amount = amount;
  } else {
    items.splice(itemIndex, 1);
  }
  return (amount - oldAmount) * getProductById(itemId).price;
}

module.exports = { getCart, addItem, changeItemAmount };
