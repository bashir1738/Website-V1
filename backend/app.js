const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { limiter, submissionLimiter } = require('./middlewares/rateLimiter');
const sanitize = require('./middlewares/sanitizeMiddleware');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

function normalizeFrontendOrigin(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('FRONTEND_URL must contain HTTP(S) origins');
  }
  return url.origin;
}

const FRONTEND_ORIGINS = new Set(
  (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map(normalizeFrontendOrigin),
);

// MED-3: helmet sets essential HTTP security headers in one call.
// crossOriginResourcePolicy is set to 'cross-origin' because this is a
// pure API server — all legitimate consumers are on different origins.
// The cors() middleware below controls which origins are actually allowed.
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server / curl requests (no Origin header) and any
      // origin on the allow-list. The `cors` package reflects the single
      // matching origin back, so the header never contains multiple values.
      if (!origin || FRONTEND_ORIGINS.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin '${origin}' is not allowed by CORS policy`));
      }
    },
    credentials: true,
  }),
);

// HIGH-3: cookie-parser must come before any middleware that reads req.cookies.
app.use(cookieParser());
app.use(limiter);

// Email-branding assets (logo, etc.) are served here so HTML emails can
// reference them by URL. Email clients strip `data:` URIs, so inline base64
// images never render reliably; a plain HTTPS URL does.
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(sanitize);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blog'));
app.use('/api/events', require('./routes/event'));
app.use('/api/contact', submissionLimiter, require('./routes/contact'));
app.use('/api/applications', submissionLimiter, require('./routes/applications'));
app.use('/api/hiring-requests', submissionLimiter, require('./routes/hire'));
app.use('/api/prodfest-registrations', submissionLimiter, require('./routes/prodfest'));
app.use('/api/sponsorships', submissionLimiter, require('./routes/sponsor'));
app.use('/api/opensource-applications', submissionLimiter, require('./routes/opensource'));
app.use('/api/alumni-submissions', submissionLimiter, require('./routes/alumni'));
app.use('/api/newsletter', submissionLimiter, require('./routes/newsletter'));
app.use('/api/payments', submissionLimiter, require('./routes/payments'));
app.use('/api/payment-reviews', require('./routes/paymentReviews'));

app.use((err, req, res, _next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: 'Invalid JSON in request body' });
  }
  if (err.status === 413) {
    return res.status(413).json({ success: false, error: 'Request body too large' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

module.exports = app;
