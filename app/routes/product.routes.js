const Product = require("../controllers/product.controller");
const ProductMW = require("../middleware/product.middleware");
const Auth = require("../middleware/auth.middleware");

module.exports = (app)=>{
  const router = require('express').Router();
  app.use('/api', router);
  router.get('/products', ProductMW.pagination, Product.searchProducts);
  router.get('/products/categories', Product.getCategories);
  router.get('/products/:id', Product.getProductById);
  router.post('/products', Auth.authenticate, Auth.authorize, Product.saveProduct);
  router.put('/products/:id', Auth.authenticate, Auth.authorize, Product.updateProduct);
  router.delete('/products/:id', Auth.authenticate, Auth.authorize, Product.deleteProduct);
}