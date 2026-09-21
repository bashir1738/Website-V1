const { Sponsorship } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');

exports.submit = async (req, res) => {
  try {
    const sponsor = await Sponsorship.create(req.body);

    // Fire-and-forget: email failures must not roll back a successful DB write.
    Promise.all([
      sendConfirmationEmail({
        to: req.body.email,
        subject: 'Partnership inquiry received — Blockfuse',
        html: `<p>Hi ${escHtml(req.body.name)},</p><p>Thank you for your interest in partnering with Blockfuse. Our partnerships lead will reach out with the deck and a time to talk.</p>`,
      }),
      notifyAdmin({
        subject: `New sponsorship inquiry: ${escHtml(req.body.organisation)}`,
        html: `<p><strong>${escHtml(req.body.name)}</strong> from <em>${escHtml(req.body.organisation)}</em> is interested in sponsoring.</p>`,
      }),
    ]).catch((err) => console.error('Sponsor email error:', err));

    return res.status(201).json({ success: true, data: { id: sponsor.id } });
  } catch (err) {
    console.error('Sponsor error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const sponsors = await Sponsorship.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: sponsors });
  } catch (err) {
    console.error('Get sponsors error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
