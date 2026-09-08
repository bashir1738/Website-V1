const { Sponsorship } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');

exports.submit = async (req, res) => {
  try {
    const sponsor = await Sponsorship.create(req.body);

    await sendConfirmationEmail({
      to: req.body.email,
      subject: 'Partnership inquiry received — Blockfuse',
      html: `<p>Hi ${req.body.name},</p><p>Thank you for your interest in partnering with Blockfuse. Our partnerships lead will reach out with the deck and a time to talk.</p>`,
    });

    await notifyAdmin({
      subject: `New sponsorship inquiry: ${req.body.organisation}`,
      html: `<p><strong>${req.body.name}</strong> from <em>${req.body.organisation}</em> is interested in sponsoring.</p>`,
    });

    return res.status(201).json({ success: true, data: sponsor });
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

exports.update = async (req, res) => {
  try {
    const sponsor = await Sponsorship.findByPk(req.params.id);
    if (!sponsor) return res.status(404).json({ success: false, error: 'Sponsorship not found' });
    await sponsor.update(req.body);
    return res.json({ success: true, data: sponsor });
  } catch (err) {
    console.error('Update sponsor error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const sponsor = await Sponsorship.findByPk(req.params.id);
    if (!sponsor) return res.status(404).json({ success: false, error: 'Sponsorship not found' });
    await sponsor.destroy();
    return res.json({ success: true, message: 'Sponsorship deleted' });
  } catch (err) {
    console.error('Delete sponsor error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
