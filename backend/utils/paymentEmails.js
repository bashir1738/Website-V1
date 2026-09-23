const { sendConfirmationEmail, notifyAdmin } = require('./resend');
const { escHtml } = require('./escHtml');
const { wrapEmail } = require('./emailBrand');

const formatNaira = (kobo) => `₦${(kobo / 100).toLocaleString('en-NG')}`;

/**
 * Payment-link email for a submission whose payment is still pending. Sent at
 * submit time so an applicant who leaves the Paystack checkout can come back
 * and complete it from their inbox.
 */
const sendPaymentLinkEmail = async ({ kind, name, email, amountKobo, authorizationUrl, reference }) => {
  if (!authorizationUrl || !authorizationUrl.startsWith('https://')) {
    console.warn('[paystack] Skipped payment-link email: no checkout URL for', reference);
    return;
  }
  const amount = formatNaira(amountKobo);
  const isSponsor = kind === 'sponsorship';

  const html = wrapEmail({
    eyebrow: 'Payment pending',
    title: isSponsor
      ? `Confirm your ${amount} sponsor pledge`
      : `Complete your ${amount} application payment`,
    bodyHtml: `<p style="margin:0 0 12px;">Hi ${escHtml(name)},</p>
<p style="margin:0;">Your ${isSponsor ? 'partnership inquiry' : 'application'} was received, but your payment is still pending. Complete it now and your place is confirmed immediately.</p>
<p style="margin:14px 0 0;font-size:13px;color:#6B6572;">Payment reference: <code style="font-family:Consolas,Menlo,monospace;">${escHtml(reference)}</code></p>`,
    button: { label: `Pay ${amount} securely`, url: authorizationUrl },
  });

  return sendConfirmationEmail({
    to: email,
    subject: isSponsor
      ? 'Complete your sponsor pledge — Blockfuse'
      : 'Complete your application payment — Blockfuse Academy',
    html,
  });
};

/**
 * Confirmation + admin notification for payment-backed submissions.
 * Only ever called after a payment is verified, so emails don't imply a
 * successful submission that was never paid for. `record` must have the
 * fields the two flows need.
 */
const sendPaidEmails = async ({ kind, record }) => {
  const common = { name: record.name, email: record.email };
  const amount = formatNaira(record.payment_amount || 0);

  if (kind === 'application') {
    return Promise.all([
      sendConfirmationEmail({
        to: common.email,
        subject: 'Application received — Blockfuse Academy',
        html: wrapEmail({
          eyebrow: 'Payment confirmed',
          title: 'Your application is in',
          bodyHtml: `<p style="margin:0 0 12px;">Hi ${escHtml(common.name)},</p>
<p style="margin:0;">Your application for Cohort III and your ${amount} payment have been received. You'll hear about the technical screen within 10 working days.</p>`,
        }),
      }),
      notifyAdmin({
        subject: `New program application from ${escHtml(common.name)}`,
        html: wrapEmail({
          eyebrow: 'Admin',
          title: 'New program application',
          bodyHtml: `<p style="margin:0;"><strong>${escHtml(common.name)}</strong> (${escHtml(common.email)}) applied for <em>${escHtml(record.track || 'TBD')}</em> — payment confirmed (${amount}).</p>`,
        }),
      }),
    ]);
  }

  if (kind === 'sponsorship') {
    return Promise.all([
      sendConfirmationEmail({
        to: common.email,
        subject: 'Partnership inquiry received — Blockfuse',
        html: wrapEmail({
          eyebrow: 'Payment confirmed',
          title: 'Thank you for sponsoring',
          bodyHtml: `<p style="margin:0 0 12px;">Hi ${escHtml(common.name)},</p>
<p style="margin:0;">Your ${amount} sponsor pledge is confirmed. Our partnerships lead will reach out with the deck and a time to talk.</p>`,
        }),
      }),
      notifyAdmin({
        subject: `New sponsorship inquiry: ${escHtml(record.organisation)}`,
        html: wrapEmail({
          eyebrow: 'Admin',
          title: 'New sponsor pledge',
          bodyHtml: `<p style="margin:0;"><strong>${escHtml(common.name)}</strong> from <em>${escHtml(record.organisation)}</em> is sponsoring — payment confirmed (${amount}).</p>`,
        }),
      }),
    ]);
  }

  return Promise.resolve();
};

module.exports = { sendPaymentLinkEmail, sendPaidEmails };