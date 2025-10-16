const User = require('../models/userModel');
const { accessTokenGenerator, refreshTokenGenerator } = require('../utils/tokenGenerator');

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'You need to fill all fields'});
    } 

    const exists = await User.findOne({$or: [{username}, {email}]});
    if (exists) {
      return res.status(401).json({message: 'User already exists'});
    }

    const user = await User.create({
      username,
      email,
      password
    });

    const accessToken = accessTokenGenerator(user);
    const refreshToken = refreshTokenGenerator(user);

    user.refreshToken = refreshToken;

    await user.save();
    console.log('User after save:', user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV==='production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({ message: 'User created successfully', accessToken: accessToken, refreshToken: refreshToken});

  } catch (err) {
    return res.status(500).json({ error: 'Internal server error.'});
  }
};

module.exports = signupController;