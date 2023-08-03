const Product = require('../models/productModel');

const products = [
  new Product(1, 'Product 1', 'Description of Product 1', 10),
  new Product(2, 'Product 2', 'Description of Product 2', 15),
  // Agrega más productos aquí...
];

const getProducts = () => {
  return products;
};

module.exports = {
  getProducts,
};
