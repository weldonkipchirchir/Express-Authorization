const jwt = require('jsonwebtoken');
require('dotenv').config()
const key = process.env.SECRET_KEY

module.exports=function (req, res, next) {
    const token = req.header('x-auth-token');
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      req.user = decoded;
      next();
    });
  }
  