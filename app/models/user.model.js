const validator = require('validator');

module.exports = (mongoose) =>{
  const User = mongoose.model('user', new mongoose.Schema({
    firstName : {
      type : String,
    },
    lastName : {
      type : String,
    },
    userName : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required : true,
      validate : (value)=>validator.isEmail(value),
      unique : true
    },
    password : {
      type : String,
      required : true
    },
    contactNumber : {
      type : String,
      required : true
    },
    role : {
      type : String,
      default : "user"
    }
  },
  {timestamps : true}
  ));
  return User;
};