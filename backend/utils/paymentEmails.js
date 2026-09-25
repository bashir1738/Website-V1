const { sendConfirmationEmail, notifyAdmin } = require('./resend');
const { escHtml } = require('./escHtml');
const { wrapEmail } = require('./emailBrand');
const {
  BANK_NAME,
  BANK_ACCOUNT_NAME,
  BANK_ACCOUNT_NUMBER,
  FRONTEND_ORIGIN,
} = require('../config/payments');

const formatNaira = (naira) => `₦${Number(naira || 0).toLocaleString('en-NG')}`;

/**
 * Sent immediately after the application form is submitted. Carries the
 * applicant's personal status link so they can reach payment instructions and
 * their live application status without an account.
 */
const sendStatusLinkEmail = async ({ name, email, track, statusUrl }) => {
  return sendConfirmationEmail({
    to: email,
    subject: 'Your application: next steps | Blockfuse Labs',
    html: wrapEmail({
      eyebrow: 'Application received',
      title: 'Your next step: secure your seat',
      bodyHtml: `<p style="margin:0 0 12px;">Hi ${escHtml(name)},</p>
<p style="margin:0 0 12px;">Your application for <em>${escHtml(track || 'an academy program')}</em> was received. To secure your place you need to complete the payment step — either the full track fee or, for Blockchain Engineering, the 50% first installment.</p>
<p style="margin:0 0 4px;font-size:13px;color:#6B6572;">Application fee is non-refundable. Payment is required to secure your spot in the program.</p>`,
      button: { label: 'See payment instructions', url: statusUrl },
    }),
  });
};

/**
 * Emails sent when an applicant uploads proof of a bank transfer:
 *  - the applicant is told it is awaiting manual verification,
 *  - an admin is told there is a new payment to review.
 */
const sendPaymentSubmittedEmails = async ({
  name,
  email,
  track,
  trackName,
  amount,
  installment,
  totalInstallments,
  paymentId,
}) => {
  const installLabel =
    totalInstallments > 1 ? ` — installment ${installment} of ${totalInstallments}` : '';
  const applicantBody = [
    `<p style="margin:0 0 12px;">Hi ${escHtml(name)},</p>`,
    `<p style="margin:0 0 12px;">Payment submitted — awaiting verification. We received your transfer proof for <em>${escHtml(trackName || track)}</em> (${formatNaira(amount)}${installLabel}).</p>`,
    `<p style="margin:0;">An admin will verify it against our bank account, usually within 1–2 working days. You'll get an email here as soon as your payment is confirmed.</p>`,
  ].join('');

  const adminBody = [
    `<p style="margin:0 0 12px;"><strong>${escHtml(name)}</strong> (${escHtml(email)}) uploaded a payment proof for <em>${escHtml(trackName || 'Unknown track')}</em>.</p>`,
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:16px 0 4px;border:1px solid #EAE6EE;border-radius:12px;">
      <tr><td style="padding:10px 14px;font-size:12px;color:#6B6572;">Amount</td><td align="right" style="padding:10px 14px;font-size:13px;font-weight:bold;color:#17121C;">${formatNaira(amount)}</td></tr>
      <tr><td style="padding:10px 14px;font-size:12px;color:#6B6572;">Installment</td><td align="right" style="padding:10px 14px;font-size:13px;color:#17121C;">${installment || 1}${totalInstallments > 1 ? ` of ${totalInstallments}` : ''}</td></tr>
      <tr><td style="padding:10px 14px;font-size:12px;color:#6B6572;">Bank</td><td align="right" style="padding:10px 14px;font-size:13px;color:#17121C;">${escHtml(BANK_ACCOUNT_NAME)} · ${escHtml(BANK_ACCOUNT_NUMBER)} · ${escHtml(BANK_NAME)}</td></tr>
    </table>`,
  ].join('');

  return Promise.all([
    sendConfirmationEmail({
      to: email,
      subject: 'Payment submitted: awaiting verification | Blockfuse Labs',
      html: wrapEmail({
        eyebrow: 'Payment received',
        title: 'Payment submitted — awaiting verification',
        bodyHtml: applicantBody,
      }),
    }),
    notifyAdmin({
      subject: `New payment proof: ${name} ${formatNaira(amount)}`,
      html: wrapEmail({
        eyebrow: 'Admin · Payment review',
        title: 'New payment proof to review',
        bodyHtml: adminBody,
        button: {
          label: 'Review payment #' + paymentId,
          url: `${FRONTEND_ORIGIN}/admin/payments?view=${paymentId}`,
        },
      }),
    }),
  ]);
};

/**
 * Confirmation sent when an admin verifies a payment. For installment flows
 * (Blockchain Engineering) it notes that installment 2 becomes due after
 * week 8 of the program.
 */
const sendPaymentVerifiedEmail = async ({
  name,
  email,
  trackName,
  amount,
  installment,
  totalInstallments,
  isFinalInstallment,
  nonRefundable,
}) => {
  const installLabel =
    totalInstallments > 1 ? ` (installment ${installment} of ${totalInstallments})` : '';
  const body = [
    `<p style="margin:0 0 12px;">Hi ${escHtml(name)},</p>`,
    `<p style="margin:0 0 12px;">Good news — your payment of <strong>${formatNaira(amount)}</strong> for <em>${escHtml(trackName)}</em>${installLabel} has been verified. ${nonRefundable ? 'Please note the application fee is non-refundable. ' : ''}</p>`,
  ];

  if (totalInstallments > 1 && !isFinalInstallment) {
    body.push(
      `<p style="margin:0 0 12px;">Your seat is reserved. The second installment (50%) becomes due after <strong>week 8</strong> of the program — we'll remind you, and your status page will open for the next upload when it's due.</p>`
    );
  } else if (totalInstallments > 1 && isFinalInstallment) {
    body.push(`<p style="margin:0 0 12px;">All installments are paid — you're fully enrolled. Welcome aboard.</p>`);
  } else {
    body.push(`<p style="margin:0 0 12px;">Your place in the program is now confirmed.</p>`);
  }

  body.push(`<p style="margin:16px 0 12px;"><strong>Join our community</strong></p>`);
  body.push(`<p style="margin:0 0 12px;">Stay connected and get ready for the program by joining our community channels:</p>`);
  body.push(`<ul style="margin:0 0 16px; padding-left:20px; line-height:1.6;">
    <li><strong>WhatsApp:</strong> <a href="https://wa.me/2348025463838" style="color:#A544D2;text-decoration:none;">Chat with us</a></li>
    <li><strong>Telegram:</strong> <a href="https://t.me/blockfuselabs" style="color:#A544D2;text-decoration:none;">Join the community</a></li>
    <li><strong>X (Twitter):</strong> <a href="https://x.com/blockfuselabs" style="color:#A544D2;text-decoration:none;">@blockfuselabs</a></li>
    <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/company/blockfuse-labs" style="color:#A544D2;text-decoration:none;">Blockfuse Labs</a></li>
    <li><strong>Instagram:</strong> <a href="https://www.instagram.com/blockfuselabs" style="color:#A544D2;text-decoration:none;">@blockfuselabs</a></li>
    <li><strong>YouTube:</strong> <a href="https://www.youtube.com/@blockfuselabs" style="color:#A544D2;text-decoration:none;">Blockfuse Labs</a></li>
    <li><strong>Facebook:</strong> <a href="https://www.facebook.com/profile.php?id=61562117006926" style="color:#A544D2;text-decoration:none;">Blockfuse Labs</a></li>
    <li><strong>TikTok:</strong> <a href="https://www.tiktok.com/@blockfuse.labs" style="color:#A544D2;text-decoration:none;">@blockfuse.labs</a></li>
    <li><strong>GitHub:</strong> <a href="https://github.com/blockfuselabs" style="color:#A544D2;text-decoration:none;">blockfuselabs</a></li>
  </ul>`);

  const receiptHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Receipt</title>
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #17121C; max-width: 600px; margin: 0 auto; line-height: 1.6;">
  <div style="border: 1px solid #EAE6EE; border-radius: 12px; padding: 32px; background: #fff;">
    <h2 style="margin: 0 0 24px; font-size: 24px; color: #17121C;">Payment Receipt</h2>
    <p style="margin: 0 0 8px; color: #6B6572; font-size: 14px;"><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <p style="margin: 0 0 24px; color: #6B6572; font-size: 14px;"><strong>Billed To:</strong> ${escHtml(name)} (${escHtml(email)})</p>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
      <tr style="border-bottom: 2px solid #EAE6EE;">
        <th align="left" style="padding: 12px 0; font-size: 13px; color: #6B6572; text-transform: uppercase;">Description</th>
        <th align="right" style="padding: 12px 0; font-size: 13px; color: #6B6572; text-transform: uppercase;">Amount</th>
      </tr>
      <tr style="border-bottom: 1px solid #EAE6EE;">
        <td style="padding: 16px 0; font-size: 15px;">
          <strong>${escHtml(trackName)}</strong><br>
          <span style="font-size: 13px; color: #6B6572;">${totalInstallments > 1 ? `Installment ${installment} of ${totalInstallments}` : 'Full Payment'}</span>
        </td>
        <td align="right" style="padding: 16px 0; font-size: 15px;"><strong>${formatNaira(amount)}</strong></td>
      </tr>
    </table>
    
    <div style="text-align: right; font-size: 18px;">
      <strong>Total Paid: ${formatNaira(amount)}</strong>
    </div>
    
    <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #EAE6EE; font-size: 12px; color: #6B6572; text-align: center;">
      <p style="margin: 0 0 4px;"><strong>Blockfuse Labs</strong></p>
      <p style="margin: 0;">This receipt is proof of payment for the program specified above.</p>
    </div>
  </div>
</body>
</html>
`;

  return sendConfirmationEmail({
    to: email,
    subject: 'Payment confirmed: you\'re in | Blockfuse Labs',
    html: wrapEmail({
      eyebrow: 'Payment confirmed',
      title: isFinalInstallment ? 'You\u2019re fully enrolled' : 'Payment verified',
      bodyHtml: body.join(''),
    }),
    attachments: [
      {
        filename: 'Blockfuse_Payment_Receipt.html',
        content: receiptHtml,
      },
    ],
  });
};

/**
 * Sent when an admin rejects a payment proof, so the applicant knows to
 * re-upload (with the reason shown on their status page).
 */
const sendPaymentRejectedEmail = async ({
  name,
  email,
  trackName,
  amount,
  installment,
  totalInstallments,
  rejectionReason,
  statusUrl,
}) => {
  const installLabel =
    totalInstallments > 1 ? ` (installment ${installment} of ${totalInstallments})` : '';
  const reason = rejectionReason
    ? `<p style="margin:0 0 12px;">Reason given by the reviewer: “${escHtml(rejectionReason)}”.</p>`
    : '';
  const uploadUrl = statusUrl || `${FRONTEND_ORIGIN}/apply/status`;

  return sendConfirmationEmail({
    to: email,
    subject: 'Payment proof needs attention | Blockfuse Labs',
    html: wrapEmail({
      eyebrow: 'Payment not confirmed',
      title: 'Your payment proof was not accepted',
      bodyHtml: `<p style="margin:0 0 12px;">Hi ${escHtml(name)},</p>
<p style="margin:0 0 12px;">We couldn't verify your ${formatNaira(amount)} transfer for <em>${escHtml(trackName)}</em>${installLabel}.</p>
${reason}
<p style="margin:0 0 12px;">This doesn't affect your application — open your status page to review the note and upload a corrected transfer receipt.</p>`,
      button: { label: 'Upload a new proof', url: uploadUrl },
    }),
  });
};

module.exports = {
  sendStatusLinkEmail,
  sendPaymentSubmittedEmails,
  sendPaymentVerifiedEmail,
  sendPaymentRejectedEmail,
};