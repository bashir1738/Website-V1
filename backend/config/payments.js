require('dotenv').config();

/**
 * Manual payment-verification configuration.
 *
 * All program fees are fixed server-side (see config/tracks.js) and are never
 * trusted from the client. Applicants pay via bank transfer to a Blockfuse
 * account and upload proof, which an admin verifies manually.
 */

const CURRENCY = 'NGN';

/**
 * Bank account applicants transfer tuition to. Read from env so credentials
 * never live in source control. Fails loudly at startup when missing (same
 * policy as utils/resend.js) — a missing account number would send applicants
 * to nowhere.
 */
const BANK_NAME = process.env.BANK_NAME;
const BANK_ACCOUNT_NAME = process.env.BANK_ACCOUNT_NAME;
const BANK_ACCOUNT_NUMBER = process.env.BANK_ACCOUNT_NUMBER;

if (!BANK_NAME || !BANK_ACCOUNT_NAME || !BANK_ACCOUNT_NUMBER) {
  throw new Error(
    '[payments] BANK_NAME, BANK_ACCOUNT_NAME, and BANK_ACCOUNT_NUMBER are required. ' +
      'These are the bank-transfer details shown to applicants.'
  );
}

/**
 * Origin the visitor lands back on (also used for email links and the admin
 * review URL). Set PAYMENT_CALLBACK_ORIGIN explicitly (strongly recommended
 * for production) to pin the exact frontend host. Otherwise it is taken from
 * the CORS allow-list's first *non-local* entry; falls back to the first
 * entry — or localhost — when only dev origins are configured.
 */
const ORIGINS = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((u) => u.trim())
  .filter(Boolean);

const isLocal = (u) => /localhost|127\.0\.0\.1|0\.0\.0\.0/.test(u);

const FRONTEND_ORIGIN =
  (process.env.PAYMENT_CALLBACK_ORIGIN || ORIGINS.find((u) => !isLocal(u)) || ORIGINS[0])
    .replace(/\/+$/, '') || 'http://localhost:3000';

module.exports = {
  CURRENCY,
  BANK_NAME,
  BANK_ACCOUNT_NAME,
  BANK_ACCOUNT_NUMBER,
  FRONTEND_ORIGIN,
};