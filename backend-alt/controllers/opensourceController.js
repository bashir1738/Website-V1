const { OpenSourceApplication } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');

exports.submit = async (req, res) => {
  try {
    const app = await OpenSourceApplication.create(req.body);

    await sendConfirmationEmail({
      to: req.body.email,
      subject: 'Open source application received — Blockfuse',
      html: `<p>Hi ${req.body.name},</p><p>You're in the queue. We'll add you to the next onboarding batch and introduce you to a maintainer.</p>`,
    });

    await notifyAdmin({
      subject: `New open source application: ${req.body.name}`,
      html: `<p><strong>${req.body.name}</strong> (${req.body.github}) wants to contribute to open source.</p>`,
    });

    return res.status(201).json({ success: true, data: app });
  } catch (err) {
    console.error('Open source error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const applications = await OpenSourceApplication.findAll({ order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: applications });
  } catch (err) {
    console.error('Get open source apps error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const application = await OpenSourceApplication.findByPk(req.params.id);
    if (!application) return res.status(404).json({ success: false, error: 'Application not found' });
    await application.update(req.body);
    return res.json({ success: true, data: application });
  } catch (err) {
    console.error('Update open source app error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const application = await OpenSourceApplication.findByPk(req.params.id);
    if (!application) return res.status(404).json({ success: false, error: 'Application not found' });
    await application.destroy();
    return res.json({ success: true, message: 'Application deleted' });
  } catch (err) {
    console.error('Delete open source app error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
