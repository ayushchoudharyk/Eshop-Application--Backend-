const user = require('../controllers/user.controller');

module.exports = (app)=>{
  const router = require('express').Router();
  app.use('/api/auth', router);
  router.post('/signup', user.signup);
  router.post('/login', user.login);
}