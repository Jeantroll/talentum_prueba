const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { keycloak } = require('../middlewares/authMiddleware');

router.get('/products', keycloak.protect('realm:admin'), productController.getProducts);

module.exports = router;
