const rateLimit = require('express-rate-limit');

const authRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: true,
  message: {
    error: 'Too many attempts. Try again after an hour'
  }
});

const requestRateLimit = rateLimit({
  windowMs: 60 * 30 * 1000,
  limit: 1000,
  standardHeaders: true,
  legacyHeaders: true,
  message: {
    error: 'Too many requests. Try again after a few minutes'
  }
});

module.exports = {
  authRateLimit,
  requestRateLimit
}