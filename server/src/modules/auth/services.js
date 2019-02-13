const { UNAUTHORIZED } = require('http-status');
const jwt = require('jsonwebtoken');
const CONFIG = require('../../config');

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, CONFIG.JWT_SECRET, (err, decodedToken) => {
    if (err) return res.status(UNAUTHORIZED).json({ message: 'Not authenticated.' });
    req.decodedToken = decodedToken;
    next();
  });
};

const signToken = data => jwt.sign(data, CONFIG.JWT_SECRET);

module.exports = {
  isAuthenticated,
  signToken,
};
