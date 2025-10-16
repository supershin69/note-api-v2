const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const { accessTokenGenerator, refreshTokenGenerator } = require('../utils/tokenGenerator');

const refreshController = async (req, res) => {
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

    const accessToken = accessTokenGenerator(user);
    const refreshToken = refreshTokenGenerator(user);

    user.refreshToken = refreshToken;

    await user.save();
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV==='production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: 'Token successfully updated', accessToken: accessToken, refreshToken: refreshToken});
  } catch(err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = refreshController;