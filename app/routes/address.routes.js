const address = require('../controllers/address.controller');
module.exports = (app)=>{
  const router = require('express').Router();
  app.use('/api', router);
  router.post('/addresses', address.addAddress);
}