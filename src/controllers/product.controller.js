const ProductModel = require("../models/product.model");

const getProducts = async (req, res, next) => {
  const pageSize = 10;
  const page = +req.query.pageNumber || 1;
  const keyword = req.query.keyword
    ? { name: { regex: req.query.keyword } }
    : {};
  const countProducts = await ProductModel.countDocuments({ ...keyword });
  const products = await ProductModel.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.send({ products, page, countProducts });
};

const createProduct = async (req, res, next) => {
  try {
    const { name, image, brand, category, description, price, countInStock } =
      req.body;
    const product = await ProductModel.create({
      user: res.locals._id,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    });
    res.send(product);
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = res.locals._id;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return next({ code: 404 });
    }
    const reviewed = product.reviews.find(
      ({ user }) => user.toString() === userId
    );
    if (reviewed) {
      return next({ code: 400, msg: "Da review san pham." });
    }
    product.reviews.push({
      name: res.locals.name,
      rating: +rating,
      comment,
      user: userId,
    });
    product.numReviews = product.reviews.length;
    const total = product.reviews.reduce((prev, curr) => prev + curr.rating, 0);
    product.rating = total / product.numReviews;

    await product.save();
    res.status(200).send({ message: "Review thanh cong." });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    next({ code: 404 });
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id).lean();
    if (!product) {
      return next({ code: 404 });
    }
    res.send({ msg: `Da xoa ${product.name}.` });
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const resInfo = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, lean: true }
    );
    if (!resInfo) {
      return next({ code: 404 });
    }
    res.send(resInfo);
  } catch (error) {
    next(error);
  }
};

const getTopProducts = async (req, res, next) => {
  try {
    const list = await ProductModel.find().sort({ numReviews: -1 }).limit(3);
    res.send(list);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  createProduct,
  createReview,
  getProductById,
  deleteProductById,
  updateProductById,
  getTopProducts,
};
