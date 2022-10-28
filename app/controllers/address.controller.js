const Address = require('../models').address;
const User = require('../models').user;
const jwt = require('jsonwebtoken');
const privateKey = "edshop";

const addAddress = async (req, res)=>{
  const accesstoken = req.header('x-auth-token');
  //verify access token
  let useroid;
  try {
    const accessUser = jwt.verify(accesstoken, privateKey);
    const {username, role, time} = accessUser;
    if(!username || !role || !time){
      throw {message : "Invalid access token"};
    }
    const user = await User.findOne({userName : username});
    if(!user){
      throw {message : "Invalid access token"};
    }
    useroid = user._id;
  } catch (err) {
    console.log(err);
    res.status(401).json({message : "Please Login first to access this endpoint!" });
  }
  const {zipcode, state, street, landmark, city, contactNumber, name} = req.body;
  if(!zipcode || !state || !street || !city || !contactNumber || !name){
    res.status(400).json({message : "Empty fields"});
    return;
  }
  const zipRegex = /^\d{6}$/;
  if(!zipRegex.test(zipcode)){
    res.status(400).json({message : "Invalid zip code!"});
    return;
  }
  const contactRegex = /^(\+91 ?)?\d{10}$/;
  if(!contactRegex.test(contactNumber)){
    res.status(400).json({message : "Invalid contact number!"});
    return;
  }
  try {
    const address = new Address({
      name,
      city,
      state,
      street,
      contactNumber,
      landmark : landmark? landmark : "",
      zipcode,
      user : useroid
    });
    await address.populate('user');
    const newAddress = await address.save();
    console.log("mewAddress ",newAddress);
    // const temp = await Address.findOne({name}).populate('user');
    // console.log(temp);
    res.status(201).json({address});
  } catch (err) {
    console.log(err);
    res.status(500).json({message : "Some error has occured, please try again"});
  }
}

module.exports = {addAddress};