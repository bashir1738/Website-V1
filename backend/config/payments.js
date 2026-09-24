require('dotenv').config();

/**
 * Fixed per-flow payment amounts, denominated in kobo (Paystack's smallest
 * unit, 100 kobo = ₦1). Amounts are authoritative on the server and are never
 * trusted from the client. Override via env when the fees change.
 */
const PAYMENTS_ENABLED = process.env.PAYMENTS_ENABLED !== 'false';

const AMOUNTS_KOBO = {
  application: Number(process.env.APPLICATION_FEE_KOBO) || 500000,
  sponsorship: Number(process.env.SPONSORSHIP_FEE_KOBO) || 2000000,
};

const CURRENCY = 'NGN';

/**
 * Origin the visitor lands back on after Paystack checkout. Set
 * PAYMENT_CALLBACK_ORIGIN explicitly (strongly recommended for production) to
 * pin the exact frontend host. Otherwise it is taken from the CORS allow-list's
 * first *non-local* entry so deployed builds use the real public host even when
 * the list also carries local dev URLs (paying users must never be redirected
 * back to a localhost checkout). Falls back to the first entry — or localhost —
 * when only dev origins are configured.
 */
const ORIGINS = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((u) => u.trim())
  .filter(Boolean);

const isLocal = (u) => /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(u);

const FRONTEND_ORIGIN =
  (process.env.PAYMENT_CALLBACK_ORIGIN || ORIGINS.find((u) => !isLocal(u)) || ORIGINS[0])
    .replace(/\/+$/, '') || 'http://localhost:3000';

module.exports = { PAYMENTS_ENABLED, AMOUNTS_KOBO, CURRENCY, FRONTEND_ORIGIN };