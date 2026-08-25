const { HireRequest } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');

exports.submit = async (req, res) => {
  try {
    const hire = await HireRequest.create(req.body);

    await sendConfirmationEmail({
      to: req.body.email,
      subject: 'Hire request received — Blockfuse',
      html: `<p>Hi ${req.body.name},</p><p>Thanks for your interest in hiring Blockfuse engineers. Our talent team will reach out within three working days.</p>`,
    });

    await notifyAdmin({
      subject: `New hire request from ${req.body.company}`,
      html: `<p><strong>${req.body.name}</strong> from <em>${req.body.company}</em> wants to hire engineers.</p>`,
    });

    return res.status(201).json({ success: true, data: hire });
  } catch (err) {
    console.error('Hire request error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const requests = await HireRequest.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: requests });
  } catch (err) {
    console.error('Get hire requests error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
