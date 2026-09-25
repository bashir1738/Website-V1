const { OpenSourceApplication } = require('../models');
const { sendConfirmationEmail, notifyAdmin } = require('../utils/resend');
const { escHtml } = require('../utils/escHtml');

exports.submit = async (req, res) => {
  try {
    const app = await OpenSourceApplication.create(req.body);

    // Fire-and-forget: email failures must not roll back a successful DB write.
    Promise.all([
      sendConfirmationEmail({
        to: req.body.email,
        subject: 'Open source application received | Blockfuse Labs',
        html: `<p>Hi ${escHtml(req.body.name)},</p><p>You're in the queue. We'll add you to the next onboarding batch and introduce you to a maintainer.</p>`,
      }),
      notifyAdmin({
        subject: `New open source application: ${escHtml(req.body.name)}`,
        html: `<p><strong>${escHtml(req.body.name)}</strong> (${escHtml(req.body.github)}) wants to contribute to open source.</p>`,
      }),
    ]).catch((err) => console.error('Open source email error:', err));

    return res.status(201).json({ success: true, data: { id: app.id } });
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


exports.remove = async (req, res) => {
  try {
    const item = await OpenSourceApplication.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Not found' });
    await item.destroy();
    return res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
