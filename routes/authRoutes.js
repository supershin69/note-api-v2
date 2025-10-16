const express = require('express');
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
const refreshController = require('../controllers/refreshController');
const logoutController = require('../controllers/logoutController');

const router = express.Router();

router.post('/signup', signupController);

router.post('/login', loginController);

router.post('/refresh', refreshController);

router.post('/logout', logoutController);

module.exports = router;