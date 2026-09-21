const jwt = require('jsonwebtoken');
require('dotenv').config();

const COOKIE_NAME = 'bf_admin_token';

/**
 * HIGH-3: Read the JWT from the HttpOnly cookie set at login.
 * The Authorization header is no longer used — HttpOnly cookies are
 * inaccessible to JavaScript and therefore not stealable via XSS.
 */
const authMiddleware = (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired session' });
  }
};

module.exports = authMiddleware;
