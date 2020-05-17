const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Product = require("../models/product");

const getProductsList = (req, res, next) => {
  Product.fetchAll((allproducts) => {
    res.json({ products: allproducts });
  });
};
const getProductById = (req, res, next) => {
  const productId = req.params.id;

  Product.findById(productId, (product) => {
    if (!product) {
      res.status(500).json({ message: "No Product Found" });
    } else {
      res.json({ product });
    }
  });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { amount, amountType, date, description } = req.body;
  const createdProduct = new Product(
    null,
    date,
    description,
    amountType,
    amount
  );
  createdProduct.save((savedProduct) => {
    res.status(201).json({ product: savedProduct });
  });
};

const updateProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const id = req.params.id;
  const { amount, amountType, date, description } = req.body;
  const updatedProduct = new Product(id, date, description, amountType, amount);
  updatedProduct.save((savedProduct) => {
    res.status(200).json({ product: savedProduct });
  });
};

const deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.deleteById(productId, (product) => {
    res.status(200).json({ message: "Product deleted successfully." });
  });
};

exports.getProductsList = getProductsList;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
