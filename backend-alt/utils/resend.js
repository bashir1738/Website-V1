const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@blockfuse.io';
const FROM_EMAIL = 'Blockfuse <noreply@blockfuse.io>';

const sendConfirmationEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send confirmation email:', error.message);
  }
};

const notifyAdmin = async ({ subject, html }) => {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to notify admin:', error.message);
  }
};

module.exports = { sendConfirmationEmail, notifyAdmin };
