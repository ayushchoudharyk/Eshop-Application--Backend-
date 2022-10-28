const jwt = require('jsonwebtoken');
const privateKey = 'edshop';

const authenticate = (req, res, next) => {
  const accessToken = req.header('x-auth-token');
  try {
    if(!accessToken){
      throw "no access token";
    }
    const user = jwt.verify(accessToken, privateKey);
    console.log(user);
    if(!user){
      throw "invalid user";
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({message : "Please Login first to access this endpoint!"});
    return;
  }
}

const authorize = (req, res, next) =>{
  const {user} = req;
  if(user.role !== "admin"){
    res.status(403).json({message : "You are not authorized to access this endpoint!"});
    return;
  }
  next();
}

module.exports = {authenticate, authorize};