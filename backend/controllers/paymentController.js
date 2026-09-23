const { Op } = require('sequelize');
const { ProgramApplication, Sponsorship } = require('../models');
const { verifyPayment, verifyWebhookSignature } = require('../utils/paystack');
const { sendPaidEmails } = require('../utils/paymentEmails');
const { CURRENCY } = require('../config/payments');

const KIND_BY_PREFIX = {
  APP: 'application',
  SPON: 'sponsorship',
};

const MODEL_BY_KIND = {
  application: ProgramApplication,
  sponsorship: Sponsorship,
};

const kindFromReference = (reference) => {
  if (!reference) return null;
  const prefix = (reference || '').split('_')[0].toUpperCase();
  return KIND_BY_PREFIX[prefix] || null;
};

/**
 * Mark a record paid — atomically, and only once. Returns `true` when this
 * call flipped it to paid (i.e. it should send the emails), `false` when it
 * was already paid by a previous verify/webhook call (idempotent).
 */
async function markPaidAtomic(kind, reference, paidAt) {
  const model = MODEL_BY_KIND[kind];
  if (!model) return null;

  const [affected] = await model.update(
    { payment_status: 'paid', payment_paid_at: paidAt || new Date() },
    { where: { payment_reference: reference, payment_status: { [Op.ne]: 'paid' } } }
  );
  if (!affected) return false;

  return model.findOne({ where: { payment_reference: reference } });
}

/** POST /api/payments/verify — called by the browser after the inline popup. */
exports.verify = async (req, res) => {
  try {
    const reference = String(req.body.reference || '').trim();
    const kind = kindFromReference(reference);
    const model = MODEL_BY_KIND[kind];

    if (!reference || !model) {
      return res.status(400).json({ success: false, error: 'Invalid payment reference.' });
    }

    const existing = await model.findOne({ where: { payment_reference: reference } });
    if (!existing) {
      return res.status(404).json({ success: false, error: 'No submission matches this payment.' });
    }

    // Already verified (e.g. the webhook won the race).
    if (existing.payment_status === 'paid') {
      return res.json({ success: true, data: { paid: true } });
    }

    let payment;
    try {
      payment = await verifyPayment(reference);
    } catch (err) {
      console.error('Paystack verify error:', err.message);
      return res.status(502).json({ success: false, error: 'Payment could not be verified right now.' });
    }

    const okAmount = payment.amount === Number(existing.payment_amount);
    const okCurrency = payment.currency === CURRENCY;
    if (payment.status !== 'success' || !okAmount || !okCurrency) {
      console.error('Payment verification mismatch:', { reference, payment });
      return res.status(402).json({ success: false, error: 'Payment was not completed successfully.' });
    }

    const result = await markPaidAtomic(kind, reference, payment.paidAt);
    // Another path (webhook or earlier verify) already marked it paid.
    if (!result) {
      return res.json({ success: true, data: { paid: true } });
    }

    // Emails are fire-and-forget; a failure must not roll back the paid status.
    sendPaidEmails({ kind, record: result }).catch((err) =>
      console.error('Paid email error:', err)
    );

    return res.json({ success: true, data: { paid: true } });
  } catch (err) {
    console.error('Payment verify error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

/** POST /api/payments/webhook — Paystack charge.success events. */
exports.webhook = async (req, res) => {
  try {
    const rawBody = req.body;
    // express.raw gives us a Buffer; a parsed JSON body means the raw parser
    // never saw it, so there is nothing valid to check.
    if (!Buffer.isBuffer(rawBody) || rawBody.length === 0) {
      return res.status(400).send('Invalid body');
    }

    const signature = req.headers['x-paystack-signature'];
    if (!verifyWebhookSignature(rawBody, signature)) {
      return res.status(401).send('Invalid signature');
    }

    let event;
    try {
      event = JSON.parse(rawBody.toString('utf8'));
    } catch (err) {
      console.error('Webhook parse error:', err.message);
      return res.status(400).send('Invalid JSON');
    }

    if (event.event !== 'charge.success') {
      return res.sendStatus(200);
    }

    const reference = String(event.data && event.data.reference || '').trim();
    const kind = kindFromReference(reference);
    const model = MODEL_BY_KIND[kind];
    if (!model) {
      console.warn('[paystack webhook] Unknown reference kind:', reference);
      return res.sendStatus(200);
    }

    const result = await markPaidAtomic(kind, reference, event.data.paid_at);
    if (result) {
      sendPaidEmails({ kind, record: result }).catch((err) =>
        console.error('Paid email error:', err)
      );
    }

    return res.sendStatus(200);
  } catch (err) {
    // Always acknowledge so Paystack stops retrying; log for investigation.
    console.error('Webhook error:', err);
    return res.sendStatus(200);
  }
};