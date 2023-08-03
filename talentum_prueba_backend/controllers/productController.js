const productService = require('../services/productService');

const getProducts = (req, res, next) => {
  try {
    const products = productService.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
};
