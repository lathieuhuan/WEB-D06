const products = [];

(() => {
  const randomN = (min, max, step = 1) => {
    return min + Math.floor((Math.random() * (max - min)) / step + 1) * step;
  };
  for (let i = 1; i <= 50; i++) {
    products.push({
      name: `San pham so ${i}`,
      image:
        "https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-do-600x600.jpg",
      brand: "Apple",
      category: "Dien thoai di dong",
      description: `(${i}) Apple đã chính thức trình làng siêu phẩm iPhone...`,
      rating: 0,
      numReviews: 0,
      price: randomN(13290000, 18290000, 200000),
      countInStock: randomN(1000, 1500),
    });
  }
})();

module.exports = products;
