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

module.exports = { PAYMENTS_ENABLED, AMOUNTS_KOBO, CURRENCY };