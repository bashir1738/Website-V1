const crypto = require('crypto');
require('dotenv').config();

// CRIT-4 (mirrors resend.js): no hardcoded fallback. When payments are enabled
// (the default) the server fails loudly at startup if the Paystack keys are a
// placeholder. Set PAYMENTS_ENABLED=false for local development without keys.
const PAYMENTS_ENABLED = process.env.PAYMENTS_ENABLED !== 'false';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;

if (PAYMENTS_ENABLED) {
  if (!PAYSTACK_SECRET_KEY || PAYSTACK_SECRET_KEY.startsWith('sk_placeholder')) {
    throw new Error(
      '[paystack] PAYSTACK_SECRET_KEY is required and must be a real key (sk_test_… or sk_live_…). ' +
        'Set PAYMENTS_ENABLED=false to run without payment keys.'
    );
  }
  if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY.startsWith('pk_placeholder')) {
    throw new Error(
      '[paystack] PAYSTACK_PUBLIC_KEY is required and must be a real key (pk_test_… or pk_live_…). ' +
        'Set PAYMENTS_ENABLED=false to run without payment keys.'
    );
  }
}

const BASE_URL = 'https://api.paystack.co';
const TIMEOUT_MS = 15000;

/** Always-uppercase, unguessable reference for a Paystack transaction. */
const generateReference = (prefix = 'BLOCKFUSE') =>
  `${prefix}_${Date.now().toString(36)}_${crypto.randomBytes(8).toString('hex')}`.toUpperCase();

/**
 * Wrapped fetch against Paystack's API. Throws on network/HTTP failures so
 * callers can decide how to degrade (never silently swallow a payment init).
 */
async function callPaystack(path, { method = 'GET', body } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.status === false) {
      throw new Error(json.message || `Paystack request failed with HTTP ${res.status}`);
    }
    return json;
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Paystack request timed out.');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Create a transaction server-side so the amount is reserved authoritatively.
 * The browser is then redirected to `authorizationUrl` (Paystack standard
 * checkout); Paystack redirects back to `callbackUrl` after the charge.
 * @returns {Promise<{reference: string, authorizationUrl: string}>}
 */
const initializePayment = async ({ email, amountKobo, reference, callbackUrl }) => {
  const json = await callPaystack('/transaction/initialize', {
    method: 'POST',
    body: {
      email,
      amount: amountKobo,
      reference,
      currency: 'NGN',
      ...(callbackUrl ? { callback_url: callbackUrl } : {}),
    },
  });
  return {
    reference: json.data.reference || reference,
    // Standard-checkout page: Paystack hosts the payment and redirects the
    // visitor back to callbackUrl when they're done (paid or abandoned).
    authorizationUrl: json.data.authorization_url || '',
  };
};

/**
 * Fetch the authoritative state of a transaction.
 * @returns {Promise<{status: string, amount: number, currency: string, paidAt: string|null}>}
 */
const verifyPayment = async (reference) => {
  const json = await callPaystack(`/transaction/verify/${encodeURIComponent(reference)}`);
  const data = json.data || {};
  return {
    status: String(data.status || ''),
    amount: Number(data.amount) || 0,
    currency: String(data.currency || ''),
    paidAt: data.paid_at || null,
  };
};

/**
 * Verify the Paystack webhook signature: HMAC-SHA512 of the raw request body
 * using the secret key, compared against the `x-paystack-signature` header.
 */
const verifyWebhookSignature = (rawBody, signature) => {
  if (!rawBody || !signature) return false;
  const expected = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
};

module.exports = {
  PAYSTACK_PUBLIC_KEY,
  generateReference,
  initializePayment,
  verifyPayment,
  verifyWebhookSignature,
};