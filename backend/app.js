const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { limiter, submissionLimiter } = require('./middlewares/rateLimiter');
const sanitize = require('./middlewares/sanitizeMiddleware');

const app = express();

const FRONTEND_URLS = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

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
      if (!origin || FRONTEND_URLS.includes(origin)) {
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

// Paystack webhook needs the raw byte-for-byte body so the HMAC-SHA512
// signature can be verified. Must be mounted BEFORE the JSON parser.
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

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
app.use('/api/payments', require('./routes/payments'));

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
