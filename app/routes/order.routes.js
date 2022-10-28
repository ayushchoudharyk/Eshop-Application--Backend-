const Order = require('../controllers/order.controller');
const Auth = require('../middleware/auth.middleware');

module.exports = (app) =>{
  const router = require('express').Router();
  app.use('/api', router);
  router.post('/orders', Auth.authenticate, Order.createOrder);
}