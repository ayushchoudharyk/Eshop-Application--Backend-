const {order : Order, product : Product, address : Address, user : User, user } = require('../models/');

const createOrder = async (req, res) =>{
  const {productId, addressId, quantity} = req.body;
  const {user} = req;
  try {
    if(user.role !== "user"){
      res.status(403).json({message : "You are not authorized to access this endpoint."});
      return;
    }
    const product = await Product.findOne({_id : productId});
    if(!product){
      res.status(404).json({message : `No Product found for ID - ${productId}!`});
      return;
    }
    const address = await Address.findOne({_id : addressId});
    if(!address){
      res.status(404).json({message : `No Address found for ID - ${addressId}!`});
      return;
    }
    if(product.availableItems <= 0){
      res.status(404).json({message : `Product with ID - ${productId} is currently out of stock!`});
      return;
    }
    const userInDb = await User.findOne({userName : user.username});
    const amount = product.price * quantity;
    const order = new Order({
      amount,
      orderDate : (new Date()).toISOString(),
      address : address._id,
      product : product._id,
      quantity,
      user : userInDb._id
    });
    const newOrder = await order.save();
    await order.populate('address');
    await order.populate('product');
    await order.populate('user');
    console.log(newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error occurred, please try again"});
  }
}

module.exports = {createOrder}; 