const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_JWT;

const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        res.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = withAuth;
