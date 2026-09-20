const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  // Only throttle mutations — read requests (e.g. the admin dashboard
  // fetching submissions) must not consume the submission quota.
  skip: (req) => ['GET', 'HEAD', 'OPTIONS'].includes(req.method),
  message: { success: false, error: 'Too many submissions, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter, submissionLimiter };
