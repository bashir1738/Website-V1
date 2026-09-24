const { sendConfirmationEmail, notifyAdmin } = require('./resend');
const { escHtml } = require('./escHtml');
const { wrapEmail } = require('./emailBrand');

const formatNaira = (kobo) => `₦${(kobo / 100).toLocaleString('en-NG')}`;
const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date instanceof Date ? date : new Date(date));

/**
 * A compact, self-contained receipt rendered into the paid confirmation email.
 * All tables are nested and inline-styled so they survive every mail client.
 */
const renderReceipt = ({ receiptNumber, paidAt, description, amountKobo, reference }) => {
  const row = (label, value) =>
    `<tr>
      <td style="padding:9px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6B6572;">${label}</td>
      <td align="right" style="padding:9px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#17121C;">${value}</td>
    </tr>`;

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 6px;border:1px solid #EAE6EE;border-radius:14px;">
    <tr>
      <td style="background:#F5F3F7;border-bottom:1px solid #EAE6EE;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding:16px 18px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.2em;color:#A544D2;text-transform:uppercase;">Payment receipt</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#17121C;margin-top:4px;">${escHtml(receiptNumber)}</div>
            </td>
            <td align="right" style="padding:16px 18px;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;color:#0E7A3C;">${formatNaira(amountKobo)}</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.08em;color:#6B6572;text-transform:uppercase;margin-top:2px;">Paid</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="border-top:1px solid #EAE6EE;padding:6px 18px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${row('Date', formatDate(paidAt))}
          ${row('Description', escHtml(description))}
          ${row('Payment reference', `<code style="font-family:Consolas,Menlo,monospace;">${escHtml(reference)}</code>`)}
          ${row('Status', '<span style="color:#0E7A3C;">Paid — confirmed</span>')}
        </table>
      </td>
    </tr>
  </table>`;
};

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
  const receiptNumber = `BLF-${String(record.payment_reference || `PAID${record.id}`).replace(/[^A-Za-z0-9]/gi, '').slice(-10).toUpperCase()}`;
  const receipt = renderReceipt({
    receiptNumber,
    paidAt: record.payment_paid_at,
    reference: record.payment_reference,
    amountKobo: record.payment_amount || 0,
  });

  if (kind === 'application') {
    return Promise.all([
      sendConfirmationEmail({
        to: common.email,
        subject: 'Application received — Blockfuse Academy',
        html: wrapEmail({
          eyebrow: 'Payment confirmed',
          title: 'Your application is in',
          bodyHtml: `<p style="margin:0 0 12px;">Hi ${escHtml(common.name)},</p>
<p style="margin:0;">Your application for <em>${escHtml(record.track || 'the programme')}</em> and your ${amount} payment were received successfully. You'll hear about the technical screen within 10 working days.</p>
${receipt}`,
        }),
      }),
      notifyAdmin({
        subject: `New program application from ${escHtml(common.name)}`,
        html: wrapEmail({
          eyebrow: 'Admin',
          title: 'New program application',
          bodyHtml: `<p style="margin:0;"><strong>${escHtml(common.name)}</strong> (${escHtml(common.email)}) applied for <em>${escHtml(record.track || 'TBD')}</em> — payment confirmed (${amount}, ${escHtml(record.payment_reference)}).</p>`,
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
<p style="margin:0;">Your ${amount} sponsor pledge from <em>${escHtml(record.organisation)}</em> is confirmed. Our partnerships lead will reach out with the deck and a time to talk.</p>
${receipt}`,
        }),
      }),
      notifyAdmin({
        subject: `New sponsorship inquiry: ${escHtml(record.organisation)}`,
        html: wrapEmail({
          eyebrow: 'Admin',
          title: 'New sponsor pledge',
          bodyHtml: `<p style="margin:0;"><strong>${escHtml(common.name)}</strong> from <em>${escHtml(record.organisation)}</em> is sponsoring — payment confirmed (${amount}, ${escHtml(record.payment_reference)}).</p>`,
        }),
      }),
    ]);
  }

  return Promise.resolve();
};

module.exports = { sendPaymentLinkEmail, sendPaidEmails };