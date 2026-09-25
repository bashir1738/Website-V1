const { Resend } = require('resend');
require('dotenv').config();
const { escHtml } = require('./escHtml');
const { FRONTEND_ORIGIN } = require('../config/payments');

// CRIT-4: No hardcoded fallback — fail loudly at startup if ADMIN_EMAIL is missing.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
if (!ADMIN_EMAIL) {
  throw new Error('[resend] ADMIN_EMAIL environment variable is required but not set.');
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY || RESEND_API_KEY.startsWith('re_your')) {
  console.warn('[resend] WARNING: RESEND_API_KEY appears to be a placeholder. Emails will fail.');
}

const resend = new Resend(RESEND_API_KEY);
// Overridable sender. Production should use a verified domain you own
// (e.g. "Blockfuse <noreply@blockfuselabs.xyz>") — Resend rejects unverified
// from-domains at send time. Verified sandbox domain: blockfuselabs.xyz.
const FROM_EMAIL = process.env.FROM_EMAIL || 'Blockfuse Labs <noreply@blockfuselabs.xyz>';

const sendConfirmationEmail = async ({ to, subject, html, attachments }) => {
  const payload = { from: FROM_EMAIL, to, subject, html };
  if (attachments) payload.attachments = attachments;
  
  const { error } = await resend.emails.send(payload);
  if (error) {
    console.error('Failed to send confirmation email to', to, ':', error.message);
    return false;
  }
  return true;
};

const notifyAdmin = async ({ subject, html }) => {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject,
    html,
  });
  if (error) {
    console.error('Failed to send admin notification:', error.message);
  }
};

/** Sent when an admin approves an alumni profile for the public directory. */
const sendAlumniApprovalEmail = async ({ email, name }) => {
  const directoryUrl = `${FRONTEND_ORIGIN}/community/alumni`;
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Your alumni profile is live | Blockfuse Labs',
    html: `<p>Hi ${escHtml(name)},</p>
<p>Good news — your profile has been verified and is now live in the Blockfuse alumni directory.</p>
<p><a href="${directoryUrl}">View the alumni directory</a></p>
<p>The Blockfuse Labs team</p>`,
  });
  if (error) {
    console.error('Failed to send alumni approval email to', email, ':', error.message);
  }
};

module.exports = { sendConfirmationEmail, notifyAdmin, sendAlumniApprovalEmail };
