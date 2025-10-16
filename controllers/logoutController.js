const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const logoutController = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: 'No token provided'});
    }
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found'});
    }

    user.refreshToken = null;
    user.tokenVersion += 1;

    await user.save();
    res.clearCookie('refreshToken');

    return res.status(200).json({ message: 'User successfully logged out'});

  } catch(err) {
    return res.status(500).json({ error: 'Internal server error'});
  }
}

module.exports = logoutController;
