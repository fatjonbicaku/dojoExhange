const jwt = require("jsonwebtoken");
require('dotenv').config()
const secret =  process.env.JWT_SECRET_KEY

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) { 
      res.status(401).json({message:"User is not logged in", status: false});
    } else {
      req.body.id = payload.id,
      req.body.isEmailVerified = payload.isEmailVerified;
      next();
    }
  });
}