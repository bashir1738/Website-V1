const { Resend } = require('resend');
require('dotenv').config();

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
const FROM_EMAIL = 'Blockfuse <noreply@blockfuse.io>';

const sendConfirmationEmail = async ({ to, subject, html }) => {
  const { error } = await resend.emails.send({ from: FROM_EMAIL, to, subject, html });
  if (error) {
    console.error('Failed to send confirmation email to', to, ':', error.message);
  }
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

module.exports = { sendConfirmationEmail, notifyAdmin };
