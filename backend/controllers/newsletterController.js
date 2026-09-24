const crypto = require('crypto');
const { NewsletterSubscriber } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');
const { wrapEmail } = require('../utils/emailBrand');
const { FRONTEND_ORIGIN } = require('../config/payments');

const MAX_SUBJECT = 200;
const MAX_MESSAGE = 5000;

const randomToken = () => crypto.randomBytes(24).toString('hex');

const unsubscribeLink = (token) =>
  `${FRONTEND_ORIGIN}/api/newsletter/unsubscribe/${encodeURIComponent(token)}`;

const renderPage = ({ title, bodyHtml }) =>
  `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#F5F3F7;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F3F7;">
      <tr>
        <td align="center" style="padding:64px 16px;">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:520px;background:#FFFFFF;border:1px solid #EAE6EE;border-radius:16px;">
            <tr>
              <td style="padding:36px 32px;font-family:Arial,Helvetica,sans-serif;">
                <div style="color:#17121C;font-size:20px;font-weight:bold;">Blockfuse&nbsp;Labs</div>
                <div style="margin-top:16px;color:#17121C;font-size:17px;font-weight:bold;line-height:1.3;">${title}</div>
                <div style="margin-top:8px;color:#6B6572;font-size:14px;line-height:1.6;">${bodyHtml}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

exports.subscribe = async (req, res) => {
  try {
    const [subscriber, created] = await NewsletterSubscriber.findOrCreate({
      where: { email: req.body.email },
      defaults: { ...req.body, status: 'approved', unsubscribe_token: randomToken() },
    });

    if (!created) {
      await subscriber.update({
        name: req.body.name,
        topics: req.body.topics,
        status: 'approved',
        // Legacy rows predating the token column get one generated here.
        ...(subscriber.unsubscribe_token ? {} : { unsubscribe_token: randomToken() }),
      });
    }

    const topics =
      Array.isArray(req.body.topics) && req.body.topics.length
        ? req.body.topics.join(', ')
        : '';

    // Fire-and-forget: email failures must not roll back a successful DB write.
    const emailTasks = [
      sendConfirmationEmail({
        to: req.body.email,
        subject: 'Subscribed to the Blockfuse dispatch',
        html: wrapEmail({
          eyebrow: 'Dispatch',
          title: "You're on the list",
          bodyHtml: `<p style="margin:0 0 12px;">Hi ${escHtml(req.body.name || 'there')},</p>
<p style="margin:0;">You're now subscribed to the Blockfuse dispatch — cohort openings, ProdFest dates, and engineering write-ups.${topics ? ` We'll tailor it to: <em>${escHtml(topics)}</em>.` : ''}</p>
<p style="margin:16px 0 0;font-size:13px;color:#6B6572;">Want out? <a href="${unsubscribeLink(subscriber.unsubscribe_token)}" style="color:#A544D2;">Unsubscribe in one click</a>. No sharing, no selling, ever.</p>`,
        }),
      }),
    ];

    if (created) {
      emailTasks.push(
        notifyAdmin({
          subject: `New subscriber: ${escHtml(req.body.email)}`,
          html: wrapEmail({
            eyebrow: 'Admin',
            title: 'New newsletter subscriber',
            bodyHtml: `<p style="margin:0;"><strong>${escHtml(req.body.email)}</strong> subscribed${req.body.name ? ` as <em>${escHtml(req.body.name)}</em>` : ''}.</p>`,
          }),
        }),
      );
    }

    Promise.all(emailTasks).catch((err) => console.error('Newsletter email error:', err));

    return res.status(created ? 201 : 200).json({ success: true, data: { id: subscriber.id } });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

/** Semi-raw body wrapped in the brand frame, one email per subscriber. */
exports.broadcast = async (req, res) => {
  try {
    const subject = String(req.body.subject || '').trim();
    const message = String(req.body.message || '').trim();

    if (!subject) return res.status(400).json({ success: false, error: 'A subject is required.' });
    if (!message) return res.status(400).json({ success: false, error: 'A message body is required.' });
    if (subject.length > MAX_SUBJECT)
      return res.status(400).json({ success: false, error: `Subject must be ${MAX_SUBJECT} characters or fewer.` });
    if (message.length > MAX_MESSAGE)
      return res.status(400).json({ success: false, error: `Message must be ${MAX_MESSAGE} characters or fewer.` });

    // Only confirmed, subscribed readers — never unsubscribed or still-pending.
    const subscribers = await NewsletterSubscriber.findAll({
      where: { status: 'approved' },
    });
    if (!subscribers.length) {
      return res.json({ success: true, data: { sent: 0, failed: 0 } });
    }

    const results = await Promise.all(
      subscribers.map((s) =>
        sendConfirmationEmail({
          to: s.email,
          subject,
          html: wrapEmail({
            eyebrow: 'Blockfuse dispatch',
            title: subject,
            bodyHtml: `<p style="margin:0 0 12px;">Hi ${escHtml(s.name || 'there')},</p>
<p style="margin:0;white-space:pre-line;">${escHtml(message)}</p>
<p style="margin:16px 0 0;font-size:13px;color:#6B6572;">You're receiving this because you subscribed to the Blockfuse dispatch. <a href="${unsubscribeLink(s.unsubscribe_token)}" style="color:#A544D2;">Unsubscribe in one click</a>.</p>`,
          }),
        }),
      ),
    );

    const failed = results.filter((ok) => ok !== true).length;

    return res.json({ success: true, data: { sent: subscribers.length - failed, failed } });
  } catch (err) {
    console.error('Newsletter broadcast error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

/** One-click unsubscribe from the confirmation/broadcast emails. */
exports.unsubscribe = async (req, res) => {
  try {
    const subscriber = await NewsletterSubscriber.findOne({
      where: { unsubscribe_token: req.params.token },
    });

    if (!subscriber) {
      return res.status(404).type('html').send(
        renderPage({
          title: 'Link not recognised',
          bodyHtml:
            '<p>The unsubscribe link is not valid, or it has already been used.</p>',
        }),
      );
    }

    await subscriber.update({ status: 'unsubscribed' });

    return res.type('html').send(
      renderPage({
        title: "You're unsubscribed",
        bodyHtml: `<p>We've stopped sending the Blockfuse dispatch to <strong>${escHtml(subscriber.email)}</strong>. The link in this email will only work once — you're all set.</p>
<p style="margin-top:18px;"><a href="${FRONTEND_ORIGIN}" style="color:#A544D2;font-weight:bold;text-decoration:none;">Back to blockfuselabs</a></p>`,
      }),
    );
  } catch (err) {
    console.error('Newsletter unsubscribe error:', err);
    return res.status(500).type('html').send(
      renderPage({
        title: 'Something went wrong',
        bodyHtml: '<p>Please try the unsubscribe link again.</p>',
      }),
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: subscribers });
  } catch (err) {
    console.error('Get subscribers error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await NewsletterSubscriber.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    await item.destroy();
    return res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};