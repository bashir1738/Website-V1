const rateLimit = require('express-rate-limit');

/**
 * Global limiter: applied to every request.
 * 200 requests per 15 minutes is intentionally generous to accommodate
 * read-heavy pages and admin dashboards.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Submission limiter: applied to public write endpoints (contact, applications, etc.).
 * Skips read-only methods so admin GET requests are never throttled.
 */
const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  skip: (req) => ['GET', 'HEAD', 'OPTIONS'].includes(req.method),
  message: { success: false, error: 'Too many submissions, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * HIGH-2: Strict login limiter.
 * 5 attempts per 15 minutes prevents brute-force attacks on the admin account.
 * Uses IP as the default key.
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many login attempts. Please wait 15 minutes and try again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter, submissionLimiter, loginLimiter };
