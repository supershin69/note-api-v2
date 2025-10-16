const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const accessTokenGenerator = (user) => {
  return jwt.sign({id: user._id, username: user.username, role: user.role, tokenVersion: user.tokenVersion}, JWT_SECRET, {expiresIn: '15m'});
}

const refreshTokenGenerator = (user) => {
  return jwt.sign({id: user._id, username: user.username, role: user.role}, REFRESH_SECRET, {expiresIn: '7d'});
}

module.exports = {
  accessTokenGenerator,
  refreshTokenGenerator
}