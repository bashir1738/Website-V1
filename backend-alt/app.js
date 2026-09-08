const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { limiter } = require('./middlewares/rateLimiter');
const sanitize = require('./middlewares/sanitizeMiddleware');

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const ALLOWED_ORIGINS = FRONTEND_URL.split(',').map((o) => o.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(limiter);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(sanitize);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blog'));
app.use('/api/events', require('./routes/event'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/hiring-requests', require('./routes/hire'));
app.use('/api/prodfest-registrations', require('./routes/prodfest'));
app.use('/api/sponsorships', require('./routes/sponsor'));
app.use('/api/opensource-applications', require('./routes/opensource'));
app.use('/api/alumni-submissions', require('./routes/alumni'));
app.use('/api/newsletter', require('./routes/newsletter'));

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
