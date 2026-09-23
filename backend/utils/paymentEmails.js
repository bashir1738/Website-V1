const { sendConfirmationEmail, notifyAdmin } = require('./resend');
const { escHtml } = require('./escHtml');

/**
 * Confirmation + admin notification for payment-backed submissions.
 * Only ever called after a payment is verified, so emails don't imply a
 * successful submission that was never paid for. `record` must have the
 * fields the two flows need.
 */
const sendPaidEmails = async ({ kind, record }) => {
  const common = { name: record.name, email: record.email };

  if (kind === 'application') {
    return Promise.all([
      sendConfirmationEmail({
        to: common.email,
        subject: 'Application received — Blockfuse Academy',
        html: `<p>Hi ${escHtml(common.name)},</p><p>Your application and payment for Cohort III have been received. You'll hear back within 10 working days.</p>`,
      }),
      notifyAdmin({
        subject: `New program application from ${escHtml(common.name)}`,
        html: `<p><strong>${escHtml(common.name)}</strong> (${escHtml(common.email)}) applied for <em>${escHtml(record.track || 'TBD')}</em> — payment confirmed.</p>`,
      }),
    ]);
  }

  if (kind === 'sponsorship') {
    return Promise.all([
      sendConfirmationEmail({
        to: common.email,
        subject: 'Partnership inquiry received — Blockfuse',
        html: `<p>Hi ${escHtml(common.name)},</p><p>Thank you for your interest in partnering with Blockfuse. Your sponsor pledge is confirmed. Our partnerships lead will reach out with the deck and a time to talk.</p>`,
      }),
      notifyAdmin({
        subject: `New sponsorship inquiry: ${escHtml(record.organisation)}`,
        html: `<p><strong>${escHtml(common.name)}</strong> from <em>${escHtml(record.organisation)}</em> is interested in sponsoring — payment confirmed.</p>`,
      }),
    ]);
  }

  return Promise.resolve();
};

module.exports = { sendPaidEmails };