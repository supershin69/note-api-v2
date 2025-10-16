const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { accessTokenGenerator, refreshTokenGenerator } = require('../utils/tokenGenerator');

const loginController = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(401).json({ message: 'All fields are required'});
    }

    const user = await User.findOne({ $or: [{ username: identifier}, {email: identifier}]});
    if (!user) {
      return res.status(404).json({ message: 'User does not exist'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong password '});
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

    return res.status(200).json({ message: 'User successfully logged in', accessToken: accessToken, refreshToken: refreshToken})
  } catch(err) {
    return res.status(500).json({ message: 'Internal server error'});
  }
}

module.exports = loginController;