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
 * Origin the visitor lands back on after Paystack checkout. Taken from the
 * CORS allow-list's first entry so local and deployed builds use the right
 * host without extra config.
 */
const FRONTEND_ORIGIN =
  (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean)[0] || 'http://localhost:3000';

module.exports = { PAYMENTS_ENABLED, AMOUNTS_KOBO, CURRENCY, FRONTEND_ORIGIN };