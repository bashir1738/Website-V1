const { ProdfestRegistration } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');

exports.submit = async (req, res) => {
  try {
    const reg = await ProdfestRegistration.create(req.body);

    await sendConfirmationEmail({
      to: req.body.email,
      subject: 'ProdFest registration received — Blockfuse',
      html: `<p>Hi ${req.body.name},</p><p>You're on the list for ProdFest 2026. We'll send the date and venue before it goes public.</p>`,
    });

    await notifyAdmin({
      subject: `New ProdFest registration: ${req.body.name}`,
      html: `<p><strong>${req.body.name}</strong> (${req.body.email}) registered for ProdFest as <em>${req.body.attending_as || 'N/A'}</em>.</p>`,
    });

    return res.status(201).json({ success: true, data: reg });
  } catch (err) {
    console.error('Prodfest error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const registrations = await ProdfestRegistration.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: registrations });
  } catch (err) {
    console.error('Get prodfest registrations error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
