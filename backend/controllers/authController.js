const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
require('dotenv').config();

const COOKIE_NAME = 'bf_admin_token';

const COOKIE_OPTIONS = {
  httpOnly: true,                                        // JS cannot read this cookie
  secure: process.env.NODE_ENV === 'production',         // HTTPS-only in prod
  // SameSite=none is required when the frontend and backend are on different
  // origins (e.g. Vercel frontend → Render backend). 'none' must be paired
  // with Secure=true or browsers will reject the cookie.
  // In development both sides are on localhost so 'lax' is sufficient.
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000,                          // 24 hours
  path: '/',
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // HIGH-3: Set the token in an HttpOnly cookie — inaccessible to JavaScript,
    // so it cannot be stolen by XSS. Do NOT return the raw token in the body.
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    return res.json({ success: true, admin: { id: admin.id, email: admin.email } });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...COOKIE_OPTIONS, maxAge: 0 });
  return res.json({ success: true });
};

exports.me = async (req, res) => {
  // req.admin is set by authMiddleware after verifying the cookie.
  return res.json({ success: true, admin: { id: req.admin.id, email: req.admin.email } });
};
